import { Component, Input } from '@angular/core';
import { ShortItem } from '../../item.model';
import { CartItem } from '../../cartItem.model';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  cartItems!: CartItem[];
  @Input() itemData!:ShortItem[];
  constructor(private apiService:ApiService,private toastr:ToastrService){}

  addToCart(item: ShortItem) {
    const carItem:CartItem={
      itemName: item.name,
      price:item.price,
      quantity:1
    }
    console.log(carItem);
    this.apiService.addCartItem(carItem)
    .then(async(data:CartItem[])=>
      {
      //  await this.getCartValue();
      //   this.cartItems=data;
   
      console.log(this.cartItems);
    })
    .catch((error)=>{
        if(error.status==404)
        {
          this.toastr.info('Maximum item quantity that can be added has been reached','Item out of stock', {
            timeOut: 3000,
             positionClass: 'toast-bottom-right'
          });
        }
      console.log(error);
      });
    }
}
