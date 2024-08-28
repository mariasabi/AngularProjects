import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderData } from '../../order.model';
import { ColDef } from 'ag-grid-community';
import {AgGridAngular}  from 'ag-grid-angular';
@Component({
  selector: 'app-grid-orders',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './grid-orders.component.html',
  styleUrl: './grid-orders.component.css'
})
export class GridOrdersComponent implements OnChanges{
  @Input({required:true}) orderData!: OrderData[];
  colDefs: ColDef[] = [];
 // colDefs: ColDef[] = ['id','username','email','role'];
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['orderData']) {
       this.colDefs = this.createColDefs(this.orderData);
     }
   }
   createColDefs(data: OrderData[]): ColDef[] {
     if (data.length === 0) return [];
     return Object.keys(data[0]).map(key => ({ field: key,flex:1,autoHeight: true   }));
   }
   // ngOnChanges(changes: SimpleChanges): void {
 
     
   //    }
   gridOptions = {
     defaultColDef: {
       resizable: true,
       wrapText: true,
       autoHeight: true
     }
 }
}
