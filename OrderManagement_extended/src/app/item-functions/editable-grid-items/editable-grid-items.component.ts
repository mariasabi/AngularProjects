import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ItemData } from '../../item.model';
import { ColDef, GridApi, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService } from '../../api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
@Component({
  selector: 'app-editable-grid-items',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,MatSort,FormsModule,MatFormFieldModule,MatSortModule,MatButtonModule,MatInputModule,MatSelectModule,MatOptionModule],
  templateUrl: './editable-grid-items.component.html',
  styleUrls: ['./editable-grid-items.component.css']
})
export class EditableGridItemsComponent implements OnInit,AfterViewInit{


 itemData!: ItemData[]; 
displayedColumns: string[] =['id','name','type','quantity','price','image','actions'];
dataSource = new MatTableDataSource<ItemData>();
public types: string[] = ['Snacks','Chocolates','Gum','Candy','Beverages','Stationery','Personal care'];
totalItems=0;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild('fileInput') fileInput!: ElementRef;
@ViewChild(MatSort) sort!:MatSort;
pageSizeOptions!:any;
constructor(private apiService:ApiService,private toastr:ToastrService){
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
    this.dataSource.data = this.itemData;
    this.dataSource.sort = this.sort;
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
    const message= `Item ${item.name} updated successfully!`
    this.toastr.success(message, 'Update successful', {
      timeOut: 3000,
       positionClass: 'toast-bottom-right'
    });
   }
    catch(error:any)
    {
      console.error('Error from server: ',error);
    }
  }
 async deleteItem(item: ItemData) {
    try{
      var inputData=item.id;
      await this.apiService.deleteItem(inputData);
      const message= `Item ${item.name} deleted successfully!`
      this.toastr.success(message, 'Delete successful', {
        timeOut: 3000,
         positionClass: 'toast-bottom-right'
      });
      }
      catch(error:any){
        console.error('Error from server: ',error);
        if(error.status==404)
          this.toastr.error('No such item exists', 'Item not found', {
            timeOut: 3000,
             positionClass: 'toast-bottom-right'
          });
        else
        console.log(error);
      }
    }

  onImageSelected(event: any, element: any) {
    const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    element.image = input.files[0]; 
    console.log(element.log);
  }
  }
}