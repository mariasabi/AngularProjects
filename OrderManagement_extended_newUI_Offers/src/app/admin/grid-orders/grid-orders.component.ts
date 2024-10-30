import { Component,  OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { OrderData } from '../../order.model';
import { ColDef } from 'ag-grid-community';
import {AgGridAngular}  from 'ag-grid-angular';
import { ApiService } from '../../api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-grid-orders',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule ,MatPaginator,MatSort,MatTableModule,CommonModule,MatFormFieldModule,MatSortModule],
  templateUrl: './grid-orders.component.html',
  styleUrl: './grid-orders.component.css'
})
export class GridOrdersComponent implements OnInit{
orderData!:OrderData[];
  colDefs: string[] = [];
  displayedColumns:string[]=['Order Id','Item Name','Quantity','Total Price','Order Time','User Name']
  //colDefsDisplay:string[]=['Id','Item name','Quantity','Total Price', 'Order Time','Username'];
  dataSource = new MatTableDataSource<OrderData>();
  totalOrders=0;
  pageSizeOptions: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
constructor(public apiService:ApiService){}
  async ngOnInit() {

    try{
          this.orderData= await this.apiService.getOrders();
          this.totalOrders = this.orderData.length; 
          this.pageSizeOptions=this.getPageSizeOptions(this.totalOrders);
          this.colDefs = this.createColDefs(this.orderData);
          this.loadData();
       }
        catch(error) {          
          console.error('Error fetching items:', error);
        }
  }
  loadData() {
    try { 
      this.dataSource = new MatTableDataSource(this.orderData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
     } 
     catch (error) {
      console.error(error);
    }
  };
   getPageSizeOptions(totalItems: number): number[] {
    return Array.from({ length: totalItems }, (_, i) => i + 1);
  }
  createColDefs(data: OrderData[]): string[] {
    if (data.length === 0) return [];
    // Get the keys from the first item in the data array and return them as a string array
    return Object.keys(data[0]);
  }
  applyFilter(event:KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    }

}
