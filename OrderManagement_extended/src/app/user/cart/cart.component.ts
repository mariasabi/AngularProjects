import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../cartItem.model';
import { ShortItem } from '../../item.model';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
constructor(private apiService:ApiService,private toastr:ToastrService){}

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
  .then(async(data:CartItem[])=>
    {
      await this.getCartValue();
      this.cartItems=data;
 
    console.log(this.cartItems);
  })
  .catch((error: any) => {
    if(error.status==404)
    {
      this.toastr.info('Maximum item quantity that can be added has been reached','Item out of stock', {
        timeOut: 3000,
         positionClass: 'toast-bottom-right'
      });
    }
    console.error('Error fetching cart items:', error);
  });
    }
   reduceQuantity(cartItem:CartItem) {
      this.apiService.decrementCartItem(cartItem)
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
