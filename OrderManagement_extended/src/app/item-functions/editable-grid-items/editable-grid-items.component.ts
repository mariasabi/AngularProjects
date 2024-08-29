import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ItemData } from '../../item.model';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService } from '../../api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-editable-grid-items',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,FormsModule,MatFormFieldModule,MatSortModule,MatButtonModule,MatInputModule],
  templateUrl: './editable-grid-items.component.html',
  styleUrls: ['./editable-grid-items.component.css']
})
export class EditableGridItemsComponent implements OnInit,AfterViewInit{

 itemData!: ItemData[]; 
//itemRow!:ItemData;
displayedColumns: string[] =['id','name','type','quantity','price','actions'];
//displayedColumns: string[]=this.getColumnNames() as string[];
dataSource = new MatTableDataSource<ItemData>();
//displayedColumns!:string[];
totalItems=0;
@ViewChild(MatPaginator) paginator!: MatPaginator;
//itemRow!:ItemData;
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
        // if (data.length === 0) 
        //     this.displayedColumns=[];
        // else 
        //   this.displayedColumns=Object.keys(data[0]);
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
   // console.log(this.itemData);
    this.dataSource.data = this.itemData;
    //console.log(this.dataSource);
   } 
   catch (error) {
    console.error(error);
    this.itemData = [];
    this.dataSource.data = this.itemData;
  }
};

async saveChanges(item:any) {
  console.log(item);
   const formData = new FormData();
  formData.append('id', item.id.toString());
  formData.append('name', item.name.toString());
  formData.append('type', item.type.toString());
  formData.append('quantity', item.quantity.toString());
  formData.append('price', item.price.toString());
  if (item.image) {
    formData.append('image', item.image);
  }
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try{ 
    await this.apiService.updateItems(formData);
   }
    catch(error:any)
    {
      console.error('Error from server: ',error);
    }
  }

}
