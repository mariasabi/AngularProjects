import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ItemData } from '../item.model';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-page-items',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,BrowserAnimationsModule],
  templateUrl: './page-items.component.html',
  styleUrl: './page-items.component.css',
})
export class PageItemsComponent implements OnInit, AfterViewInit{

//displayedColumns: string[] =['id','name','type','quantity','price'];
//displayedColumns: string[]=this.getColumnNames() as string[];
dataSource = new MatTableDataSource<ItemData>();
displayedColumns!:string[];
totalItems=0;
@ViewChild(MatPaginator) paginator!: MatPaginator;
itemData!:any;
item!:ItemData;
pageSizeOptions!:any;
constructor(private apiService:ApiService){
}
getTableData(page:number, pageSize:number){
  return this.apiService.getPageItem(page,pageSize);
}
getPageSizeOptions(totalItems: number): number[] {
  return Array.from({ length: totalItems }, (_, i) => i + 1);
}


async ngOnInit() {

  try{
       const data= await this.apiService.getItems();
        this.totalItems = data.length; 
        this.pageSizeOptions=this.getPageSizeOptions(this.totalItems);
        if (data.length === 0) 
            this.displayedColumns=[];
        else 
          this.displayedColumns=Object.keys(data[0]);
     }
      catch(error) {          
        console.error('Error fetching items:', error);
      }
}

ngAfterViewInit() {
  this.paginator.page.subscribe(() => {
      this.loadData();
    });
  this.loadData();
}

async loadData() {
  try {
    const pageIndex=this.paginator.pageIndex;
    const pageSize=this.paginator.pageSize;
    this.itemData = await this.getTableData(pageIndex+1,pageSize);
    console.log(this.itemData);
    this.dataSource.data = this.itemData;
    console.log(this.dataSource);
   } 
   catch (error) {
    console.error(error);
    this.itemData = [];
    this.dataSource.data = this.itemData;
  }
};
}
