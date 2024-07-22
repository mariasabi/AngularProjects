import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  selected?:string;
 message:string='';
  async fetchData() {
    this.message='';
    this.itemData=await this.apiService.getItems();
    console.log(this.itemData);
    this.selected='fetch';
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

  async updateData(inputData:ItemData) {
    await this.apiService.updateItems(inputData);
    this.selected='';
    this.message='Updated successfully!';
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
    this.selected='doneGetItem';
  }
  /*
  isAnyChildVisible(): boolean {
    return  this.selected === 'doneGetItem'|| this.selected === 'fetch' || this.selected === 'update' || this.message !== '';
  }*/
}
