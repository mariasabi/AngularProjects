import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { OrderData } from '../../order.model';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatPaginator,MatSortModule,MatTableModule,MatSort],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orderData!:OrderData[];
  colDefs: string[] = [];
  displayedColumns:string[]=['Order Id','Item Name','Quantity','Total Price','Order Time']
  dataSource = new MatTableDataSource<OrderData>();
  totalOrders=0;
  pageSizeOptions: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private apiService:ApiService){}
  async ngOnInit(): Promise<void> {
    try{
      this.orderData= await this.apiService.getOrdersOfUser();
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
  return Object.keys(data[0]).filter(key => key !== 'username');
}
applyFilter(event:KeyboardEvent) {
  const inputElement = event.target as HTMLInputElement;
  const filterValue = inputElement.value;
  this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
