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
import { CartService } from '../cart.service';

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
  voucherAmount: number=0;
  cartItems: CartItem[]=[];
  applyVoucher: boolean = false; // Checkbox state
  discountedCartValue: number =0;// Initial value same as cartValue
  // private cartModal: Modal | null = null;
  // private modalInstance: any;
constructor(private cartService:CartService,private apiService:ApiService,private toastr:ToastrService,
  public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
){}
  async ngOnInit(): Promise<void> {
  await this.fetchCart();
  await this.getCartValue();
 await this.getVoucherAmount();
}

calculateCartValue() {
  if (this.applyVoucher && this.cartValue>=this.voucherAmount) {
    this.discountedCartValue = this.cartValue - this.voucherAmount;
  } 
  else if(this.applyVoucher && this.cartValue<this.voucherAmount){
    this.discountedCartValue = 0;
  }
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
  console.log('Cart no: ',this.cartItems.length);
  this.dialogRef.close(this.cartItems.length);
}
purchaseDone(data:string) {
  // if (this.cartModal) {
  //   this.cartModal.hide();
  // }

  this.dialogRef.close(data);
}
async getCartValue(): Promise<void> {
  try {
    this.cartValue = await this.apiService.getCartValue();
    console.log(this.cartValue);
  } catch (error: any) {
    console.error('Error fetching cart value:', error);
  }
}
async getVoucherAmount(): Promise<void> {
  try {
    this.voucherAmount = await this.apiService.getVoucherAmount();
    console.log(this.voucherAmount);
  } catch (error: any) {
    console.error('Error fetching voucher amount:', error);
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
          this.cartService.updateCartItemNo(data.length);
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
        this.cartService.updateCartItemNo(data.length);
      console.log(this.cartItems);
    })
    .catch((error: any) => {
      console.error('Error fetching cart items:', error);
    });
     
      }
   purchaseCart() {
    let minusVoucher:number;
    if(this.applyVoucher)
    {
      if(this.cartValue<this.voucherAmount)
      {
        minusVoucher=this.voucherAmount-this.cartValue;
      }
      else
      {
        minusVoucher=0;
      }
     
    }
    else
    {
      this.discountedCartValue=this.cartValue;
      minusVoucher=this.voucherAmount;
    }
    this.apiService.purchaseCart(minusVoucher,this.discountedCartValue)
    .then(async (data: string) => {
        this.getVoucherAmount();
        this.cartItems=[];
        this.cartValue=0;
        this.cartService.updateCartItemNo(0);
        // this.purchase.emit(true);
        this.toastr.success(ORDER_PLACED_MES,ORDER_PLACED, {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        })
       
          this.purchaseDone(data);
        
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
