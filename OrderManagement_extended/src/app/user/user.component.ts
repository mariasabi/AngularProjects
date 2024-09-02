import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../item-functions/jwt.service';
import { ItemData, ShortItem } from '../item.model';
import { CartItem } from '../cartItem.model';
import { CartComponent } from "./cart/cart.component";
import { OrdersComponent } from "./orders/orders.component";
import {ToastrService} from 'ngx-toastr'
import { ItemCardComponent } from "./item-card/item-card.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, CartComponent, OrdersComponent, ItemCardComponent, SearchBarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

userName!: string;
  ordersVisible: boolean=false;
  cartValue: number=0;
  constructor(private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService, private toastr:ToastrService){}
  title = $localize`Order Management Application`;
  itemData:ShortItem[]=[];
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
await this.fetchInventory();
 }
 logout(){
  this.jwtService.logout();
  }
    viewProfile() {
    throw new Error('Method not implemented.');
    }
    goHome() {
      this.fetchInventory();
      this.home=true;
      this.cartVisible=false;
      this.ordersVisible=false;
    }
    fetchOrders() {
    this.home=false;
    this.cartVisible=false;
    this.ordersVisible=true;
    }
 async fetchInventory() {
    this.apiService.getItems()
    .then((data: any[]) => {
      this.itemData = data;
})
.catch((error)=>{
  console.error('Error fetching items:', error);
});
}
searchResults(data:ShortItem[]) {
  this.itemData=data;
  }
async getCartValue(): Promise<void> {
  try {
    this.cartValue = await this.apiService.getCartValue();
    console.log(this.cartValue);
  } catch (error: any) {
    console.error('Error fetching cart value:', error);
  }
}


  async openCart(){
    if(this.cartVisible)
    {
      this.cartVisible=false;
      this.home=true;
    }
    else
    {
    this.ordersVisible=false;
    this.home=false;
    this.getCartValue();
    this.fetchCart();
    this.cartVisible=true;
    }
  }
  cartVisiblity() {
    this.cartVisible=false;
    this.home=true;
    }
  fetchCart() {
    this.apiService.getCartItems()
      .then(async(data:CartItem[])=>
      {
       await this.getCartValue();
        this.cartItems=data;
   
      console.log(this.cartItems);
    })
  .catch((error)=>{
    if (error.status === 404) {
      console.log('No items found, showing empty cart message.');
      this.cartItems=[];
    }
    else
    console.error('Error fetching cart items:', error);
  }
  )
}
showPurchaseMessage() {
  this.toastr.success('Your purchase is successful!', 'Order placed', {
    timeOut: 3000,
  });
  }
}
