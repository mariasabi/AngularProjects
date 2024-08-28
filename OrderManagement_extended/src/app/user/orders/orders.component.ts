import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { OrderData } from '../../order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders:OrderData[]=[];
  ngOnInit(): void {
    this.getOrders();
  }
constructor(private apiService:ApiService){}
getOrders()
{
  this.apiService.getOrdersOfUser()
  .then((data:OrderData[])=>
    {this.orders=data;})
  .catch((error: any)=>{
    console.error('Error fetching items:', error);
    });
}
}
