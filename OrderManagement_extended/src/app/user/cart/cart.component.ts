import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../cartItem.model';
import { ShortItem } from '../../item.model';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

@Input() cartValue:number=0;
@Input() cartItems: CartItem[]=[];
@Output() visible = new EventEmitter<boolean>();
@Output() purchase=new EventEmitter<boolean>();
constructor(private apiService:ApiService){}

closeCart() {
  this.visible.emit(false);
}
async getCartValue(): Promise<void> {
  try {
    this.cartValue = await this.apiService.getCartValue();
    console.log(this.cartValue);
  } catch (error: any) {
    console.error('Error fetching cart value:', error);
  }
}

  increaseQuantity(cartItem:CartItem) {
  this.apiService.incrementCartItem(cartItem)
  // .then(async (data: any) => {
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
  //   this.getCartValue();
  //   console.log(this.cartItems);
  // })
  .then(async(data:CartItem[])=>
    {
      await this.getCartValue();
      this.cartItems=data;
 
    console.log(this.cartItems);
  })
  .catch((error: any) => {
    console.error('Error fetching cart items:', error);
  });
    }
   reduceQuantity(cartItem:CartItem) {
      this.apiService.decrementCartItem(cartItem)
      // .then(async (data: any) => {
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
      //   this.getCartValue();
      //   console.log(this.cartItems);
      // })
      .then(async(data:CartItem[])=>
        {
          await this.getCartValue();
          this.cartItems=data;
     
        console.log(this.cartItems);
      })
      .catch((error: any) => {
        console.error('Error fetching cart items:', error);
      });
    }
   removeCartItem(item: CartItem) {
    this.apiService.removeCartItem(item)
    // .then(async (data: any) => {
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
    //   this.getCartValue();
    //   console.log(this.cartItems);
    // })
    .then(async(data:CartItem[])=>
      {await this.getCartValue();
        this.cartItems=data;
   
      console.log(this.cartItems);
    })
    .catch((error: any) => {
      console.error('Error fetching cart items:', error);
    });
     
      }
   purchaseCart() {
    this.apiService.purchaseCart()
    .then(async (data: any) => {

        this.cartItems=[];
        this.cartValue=0;
        this.purchase.emit(true);
    })
    .catch((error: any) => {
      console.error('Error fetching cart items:', error);
    });

    }
}
