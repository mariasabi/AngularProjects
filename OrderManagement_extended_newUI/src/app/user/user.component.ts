import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { ApiService } from '../api.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { JwtService } from '../item-functions/jwt.service';
import { ItemData, ShortItem } from '../item.model';
import { CartItem } from '../cartItem.model';
import { CartComponent } from "./cart/cart.component";
import { OrdersComponent } from "./orders/orders.component";
import {ToastrService} from 'ngx-toastr'
import { ItemCardComponent } from "./item-card/item-card.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { CategoryCardComponent } from "./category-card/category-card.component";
import { filter } from 'rxjs';
import { ORDER_PLACED, ORDER_PLACED_MES } from '../constants/notifications';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
declare var bootstrap: any;
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatTooltipModule,RouterModule,CommonModule, FormsModule, CartComponent, OrdersComponent, ItemCardComponent, SearchBarComponent, CategoryCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  @ViewChild(CartComponent) cartComponent!: CartComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!:SearchBarComponent;
userName!: string;
  ordersVisible: boolean=false;
  cartValue: number=0;
  itemData: ShortItem[]=[];
  search: boolean=false;
  constructor(public dialog: MatDialog,private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService, private toastr:ToastrService){}
  title = $localize`Quick Buy`;
loading:boolean=false;
  cartItems: CartItem[]=[];
  home:boolean=true;
  itemEntries:any;
  selected?:string;
 message:string='';
 response!:any;
 buttonName!:string;
 cartVisible=false;

 async ngOnInit(): Promise<void> {
  this.route.queryParams.subscribe(params => {
     this.userName = params['name'];
     console.log(this.userName);
  });

    // Subscribe to router events to reset search state on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.search = false;
    });

 }

 logout(){
  this.jwtService.logout();
  }
    viewProfile() {
    throw new Error('Method not implemented.');
    }
    goHome() {
    
    }
    fetchOrders() {
   
    }


openCart(){
  // this.clearSearch();
  // this.cartVisible=true;
  const dialogRef = this.dialog.open(CartComponent, {
    width: '200rem',
    data: {} // pass any data if needed
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      console.log(result);
    }
  });
}
closeCart(){
  this.cartVisible=false;
}
// showPurchaseMessage() {
//   this.toastr.success(ORDER_PLACED_MES,ORDER_PLACED, {
//     timeOut: 3000,
//     positionClass: 'toast-top-right'
//   })
// }
searchResults(searchQuery:string) {
  if (!searchQuery.trim()) {
    return;  // Do not proceed if the search query is empty or only whitespace
  }
    this.search=true;
    this.loading=true;
    this.apiService.searchItem(searchQuery)
    .then(async(data:ShortItem[])=>
    {
     this.itemData=data;
     this.loading=false;
     this.searchBarComponent.clearSearchQuery(); 
  })
.catch((error)=>{
  if (error.status === 400) {
    console.log('Search key not found');
    this.loading=false;
  }
  else
  {console.error('Error fetching cart items:', error);
    this.loading=false;
  }
}
)
}

clearSearch(){
  this.search=false;
  this.itemData=[];
}
}
