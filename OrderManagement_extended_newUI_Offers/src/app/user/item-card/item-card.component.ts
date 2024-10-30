import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortItem } from '../../item.model';
import { CartItem } from '../../cartItem.model';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OUT_OF_STOCK, OUT_OF_STOCK_MES } from '../../constants/notifications';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent implements OnInit {
  cartItems!: CartItem[];
  @Input() itemData!:ShortItem[];
  @Input() loading!:boolean;
  @Input() category!:string|null;
  @Output() cartItemNo = new EventEmitter();
  result!:number;
  hoverItem: ShortItem|null=null;

  constructor(private cartService: CartService,private apiService:ApiService,private toastr:ToastrService){}
  ngOnInit(): void {
    console.log(this.itemData);
  }

  addToCart(item: ShortItem) {
    const carItem:CartItem={
      itemName: item.name,
      price:item.price,
      quantity:1
    }

    console.log(carItem);

    this.apiService.addCartItem(carItem).subscribe({
      next:(data:CartItem[])=>
      {
        // this.result=data.length;
        console.log(data.length);
        this.cartService.updateCartItemNo(data.length);
      }, 

      error:error =>{
            if(error.status==404)
            {
              this.toastr.info(OUT_OF_STOCK_MES,OUT_OF_STOCK, {
                timeOut: 3000,
                positionClass: 'toast-top-right'
              });
            }
          console.log(error);
          }
        });
  }
}
