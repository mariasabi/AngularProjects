import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { AddItemComponent } from './add-item/add-item.component';
import { MatDialog } from '@angular/material/dialog';
import { ITEM_TYPES } from '../../constants/item-types';
import { NO_ITEM,ITEM_DELETED, DELETE_SUCESS, ITEM_NOT_FOUND, ITEM_UPDATED, UPDATE_SUCESS } from '../../constants/notifications';
import { UploadComponent } from './upload/upload.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-editable-grid-items',
  standalone: true,
  imports: [MatTooltipModule,MatPaginatorModule,MatTableModule,CommonModule,MatSort,FormsModule,MatFormFieldModule,MatSortModule,MatButtonModule,MatInputModule,MatSelectModule,MatOptionModule],
  templateUrl: './editable-grid-items.component.html',
  styleUrls: ['./editable-grid-items.component.css']
})
export class EditableGridItemsComponent implements OnInit{


itemData!: ItemData[]; 
displayedColumns: string[] =['id','name','type','quantity','price','image','actions'];
dataSource = new MatTableDataSource<ItemData>();
types = ITEM_TYPES;
totalItems=0;
items!:any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChildren('fileInputs') fileInputs!: QueryList<ElementRef>;
@ViewChild(MatSort) sort!:MatSort;
pageSizeOptions!:any;
constructor(private apiService:ApiService,private toastr:ToastrService,public dialog: MatDialog){
}

getPageSizeOptions(totalItems: number): number[] {
  return Array.from({ length: totalItems }, (_, i) => i + 1);
}


async ngOnInit() {

  try{
        this.items= await this.apiService.getItems();
        this.totalItems = this.items.length; 
        this.pageSizeOptions=this.getPageSizeOptions(this.totalItems);
        this.loadData();
     }
      catch(error) {          
        console.error('Error fetching items:', error);
      }
}

// ngAfterViewInit() {
//   this.paginator.page.subscribe(() => {
//       this.loadData();
//     });
//   this.loadData();
// }

async loadData() {
  try {  
    // const pageIndex=this.paginator.pageIndex;
    // const pageSize=this.paginator.pageSize;
    // this.itemData = await this.getTableData(pageIndex+1,pageSize);
    // this.dataSource.data = this.itemData;
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
   } 
   catch (error) {
    console.error(error);
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
    this.toastr.success(ITEM_UPDATED, UPDATE_SUCESS,{ 
      timeOut: 3000,
       positionClass: 'toast-top-right'
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
      
      this.toastr.success(ITEM_DELETED,DELETE_SUCESS, {
        timeOut: 3000,
         positionClass: 'toast-top-right'
      });
      }
      catch(error:any){
        console.error('Error from server: ',error);
        if(error.status==404)
          this.toastr.error(NO_ITEM, ITEM_NOT_FOUND, {
            timeOut: 3000,
             positionClass: 'toast-top-right'
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

  applyFilter(event:KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    }
  addNewItem() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
      data: {} // pass any data if needed
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Item added:', result);
      }
    });
   }
   bulkNewItem() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '500px',
      data: {} // pass any data if needed
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Item added:', result);
        // Add the result (new item) to your data source or handle it as needed
      }
    });
    }
    triggerFileInput(index: number): void {
      const fileInput = this.fileInputs.toArray()[index]; 
      if (fileInput) {
        fileInput.nativeElement.click(); // Programmatically open the file input
      } else {
        console.error('File input element is not defined');
      }
    }
}
