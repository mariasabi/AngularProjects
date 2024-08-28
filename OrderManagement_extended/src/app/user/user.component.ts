import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../item-functions/jwt.service';
import { ShortItem } from '../item.model';
import { CartItem } from '../cartItem.model';
import { CartComponent } from "./cart/cart.component";
import { OrdersComponent } from "./orders/orders.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, CartComponent, OrdersComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
userName!: string;
  ordersVisible: boolean=false;
  cartValue: number=0;


  constructor(private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService){}
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
async getCartValue(): Promise<void> {
  try {
    this.cartValue = await this.apiService.getCartValue();
    console.log(this.cartValue);
  } catch (error: any) {
    console.error('Error fetching cart value:', error);
  }
}

addToCart(item: ShortItem) {
  const carItem:CartItem={
    itemName: item.name,
    price:item.price,
    quantity:1
  }
  console.log(carItem);
  this.apiService.addCartItem(carItem)
  // .then(async (data: any) => {
  //   this.getCartValue();
  //   // If the response is a string (likely JSON), first parse it
  //   let cartItemsRaw: any[] = typeof data === 'string' ? JSON.parse(data) : data;
    
  //   // Now map it to ensure it's in the format of CartItem[]
  //   this.cartItems = cartItemsRaw.map(item => {
  //     return {
  //       itemName: item.itemName,
  //       quantity: item.quantity,
  //       price: item.price
  //     } as CartItem;
  //   });
    
  //   console.log(this.cartItems);
  // })
  .then(async(data:CartItem[])=>
    {
     await this.getCartValue();
      this.cartItems=data;
 
    console.log(this.cartItems);
  })
  .catch((error)=>{
    console.log(error);
    });
  }
  async openCart(){
    if(this.cartVisible)
      this.cartVisible=false;
    else
    {
    this.ordersVisible=false;
    this.getCartValue();
    this.fetchCart();
    this.cartVisible=true;
    }
  }
  cartVisiblity() {
    this.cartVisible=false;
    }
  fetchCart() {
    this.apiService.getCartItems()
    // .then(async (data: any) => {
    //   this.getCartValue();
    //   // If the response is a string (likely JSON), first parse it
    //   let cartItemsRaw: any[] = typeof data === 'string' ? JSON.parse(data) : data;
      
    //   // Now map it to ensure it's in the format of CartItem[]
    //   this.cartItems = cartItemsRaw.map(item => {
    //     return {
    //       itemName: item.itemName,
    //       quantity: item.quantity,
    //       price: item.price
    //     } as CartItem;
    //   });
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
showOrders() {
  this.home=false;
  this.cartVisible=false;
  this.ordersVisible=true;
  }
}
