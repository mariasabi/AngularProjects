import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { CartService } from './cart.service';
import { VoucherpopupComponent } from './voucherpopup/voucherpopup.component';
declare var bootstrap: any;
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatTooltipModule,RouterModule,CommonModule, FormsModule, CartComponent, OrdersComponent, ItemCardComponent, SearchBarComponent, CategoryCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit,AfterViewInit{
  @ViewChild(CartComponent) cartComponent!: CartComponent;
  @ViewChild(VoucherpopupComponent) voucherpopup!: CartComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!:SearchBarComponent;
  // @ViewChild(ItemCardComponent) itemCard!:ItemCardComponent;
  // ngAfterViewInit() {
  //   this.itemCard.cartItemNo.subscribe(data => {
  //     console.log('Received from child:', data);
  //     this.cartItemNum=data;
  //   });
  // }
userName!: string;
  ordersVisible: boolean=false;
  cartValue: number=0;
  itemData: ShortItem[]=[];
  search: boolean=false;
  constructor(private cartService: CartService,private cdr: ChangeDetectorRef,public dialog: MatDialog,private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService, private toastr:ToastrService){}
  ngAfterViewInit(): void {
   this.cartService.cartItemNo$.subscribe((count: number) => {
  console.log('Updated cart item count:', count);
  this.cartItemNum = count;
});
}
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
cartItemNum:number=0;
 async ngOnInit(): Promise<void> {
  this.route.queryParams.subscribe(params => {
     this.userName = params['name'];
     console.log(this.userName);
  });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.search = false;
    });
this.getCartItemNo();

 }

async getCartItemNo(){
  var cartItems=await this.apiService.getCartItems();
  this.cartItemNum=cartItems.length;
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

// public cartItemNoUpdate(event: any){
//   console.log(event);
//   this.cartItemNum=event;
//   // this.cdr.detectChanges();
// }
openCart(){
  const dialogRef = this.dialog.open(CartComponent, {
    width: '200rem',
    data: {} 
  });
  
  dialogRef.afterClosed().subscribe((result: any) => {
    if(result.startsWith("Voucher"))
    {
      this.openVoucherPopUp(result);
    }
      console.log(result);
    });
}
openVoucherPopUp(result:string){
  const dialogRef = this.dialog.open(VoucherpopupComponent, {
    width: '100rem',
    data: {message:result} 
  });
  dialogRef.afterOpened().subscribe(() => {
    setTimeout(() => {
      dialogRef.close();
    }, 3000); 
  });

  dialogRef.afterClosed().subscribe((result: any) => {

    });
}
// closeCart(){
//   this.cartVisible=false; 
// }
// showPurchaseMessage() {
//   this.toastr.success(ORDER_PLACED_MES,ORDER_PLACED, {
//     timeOut: 3000,
//     positionClass: 'toast-top-right'
//   })
// }
searchResults(searchQuery:string) {
  if (!searchQuery.trim()) {
    return;  
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
