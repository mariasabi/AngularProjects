import { Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CartItem } from '../../cartItem.model';
import { ShortItem } from '../../item.model';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { ORDER_PLACED, ORDER_PLACED_MES, OUT_OF_STOCK, OUT_OF_STOCK_MES } from '../../constants/notifications';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

@Output() visible = new EventEmitter<boolean>();
@Output() purchase=new EventEmitter<boolean>();
// @ViewChild('cartModal') cartModal!: ElementRef;
  cartValue: number=0;
  cartItems: CartItem[]=[];
  // private cartModal: Modal | null = null;
  // private modalInstance: any;
constructor(private apiService:ApiService,private toastr:ToastrService,
  public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
){}
  async ngOnInit(): Promise<void> {
  await this.fetchCart();
  await this.getCartValue();
//   const modalElement = document.getElementById('cartModal');
//   if (modalElement) {
//     this.cartModal = new Modal(modalElement);
// }
}


openCart() {
  // if (this.cartModal) {
  //   this.cartModal.show();
  // }
}
closeCart() {
  // if (this.cartModal) {
  //   this.cartModal.hide();
  // }
  this.dialogRef.close();
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
      this.toastr.info(OUT_OF_STOCK_MES,OUT_OF_STOCK, {
        timeOut: 3000,
         positionClass: 'toast-top-right'
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
        // this.purchase.emit(true);
        this.toastr.success(ORDER_PLACED_MES,ORDER_PLACED, {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        })
        this.closeCart();
    })
    .catch((error: any) => {
      console.error('Error fetching cart items:', error);
    });
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
}
