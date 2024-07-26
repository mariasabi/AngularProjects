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
 response!:{dbPath:''}
 
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
  async updateData(inputData:ItemData) {
   try{ 
    await this.apiService.updateItems(inputData);
    this.selected='';
    this.message='Updated successfully!';
   }
    catch(error)
    {
      console.error('Error from server: ',error);
      this.message='Update failed.';
    }
  }
  async insertData(inputData:ItemData) {
    await this.apiService.insertItems(inputData);
    this.selected='';
    this.message='Inserted successfully!';
  }
  async deleteData(inputData:number) {
    await this.apiService.deleteItem(inputData);
    this.selected='';
    this.message='Deleted successfully!';
  }
  async getItem(inputData:number) {
    this.itemData=await this.apiService.getItem(inputData);
    console.log(this.itemData);
    this.formatItemData();
    this.selected='doneGetItem';
  }
  formatItemData() {
    this.itemEntries = Object.entries(this.itemData);
  }
public uploadFinished=(event:any)=>{
  this.response=event;
  console.log(this.response);
}

  /*
  isAnyChildVisible(): boolean {
    return  t his.selected === 'doneGetItem'|| this.selected === 'fetch' || this.selected === 'update' || this.message !== '';
  }*/
}
