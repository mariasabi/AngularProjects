import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData } from './item.model';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(private apiService:ApiService){}
  title = 'Order Management Application';
  itemData:any;
  itemEntries:any;
  selected?:string;
 message:string='';
 response!:any;
  onUpdateData(){
      this.message='';
      this.selected="update";
  }
  onInsertData(){
    this.message='';
    this.selected="insert";
}
onDeleteData(){
  this.message='';
  this.selected="delete";
}
onGetItem(){
  this.message='';
  this.selected="getItem";
}
onBulkInsert(){
  this.message='';
  this.selected="upload";
}

async fetchData() {
  this.message='';
  this.itemData=await this.apiService.getItems();
  console.log(this.itemData);
  this.selected='fetch';
}
async pageData() {
  this.message='';
  this.selected='page';
}
  async updateData(inputData:ItemData) {
   try{ 
    await this.apiService.updateItems(inputData);
    this.selected='';
    this.message='Updated successfully!';
   }
    catch(error)
    {
      console.error('Error from server: ',error);
      this.selected='';
      this.message='Update failed.';
    }
  }
  async insertData(inputData:ItemData) {
    await this.apiService.insertItems(inputData);
    this.selected='';
    this.message='Inserted successfully!';
  }
  async deleteData(inputData:number) {
    try{
    await this.apiService.deleteItem(inputData);
    this.selected='';
    this.message='Deleted successfully!';
    }
    catch(error){
      console.error('Error from server: ',error);
      this.selected='';
      this.message='Delete failed.';
    }
  }
  async getItem(inputData:number) {
    try{
    this.itemData=await this.apiService.getItem(inputData);
    console.log(this.itemData);
    this.formatItemData();
    this.selected='doneGetItem';
    }
    catch(error)
    {
      this.selected='';
      this.message="Item cannot be retrieved!";
    }
  }
  formatItemData() {
    this.itemEntries = Object.entries(this.itemData);
  }
public uploadFinished=(event:any)=>{
  this.response=event;
  console.log(this.response);
}

}
