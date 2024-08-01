import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { ItemData } from '../item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { GridItemsComponent } from "./grid-items/grid-items.component";
import { PageItemsComponent } from "./page-items/page-items.component";
import { UploadComponent } from "./upload/upload.component";
import { UpdateItemsComponent } from "./update-items/update-items.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import jwt_decode from 'jwt-decode';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-functions',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessMessageComponent, GridItemsComponent, PageItemsComponent, UploadComponent, UpdateItemsComponent, DeleteItemComponent],
  templateUrl: './item-functions.component.html',
  styleUrl: './item-functions.component.css'
})
export class ItemFunctionsComponent {
    constructor(private router:Router,private apiService:ApiService,private jwtService:JwtService){}
    title = 'Order Management Application';
    itemData:any;
    itemEntries:any;
    selected?:string;
   message:string='';
   response!:any;
   username!:any;
   ngOnInit(): void {
    const token = localStorage.getItem('authToken');  // Method to get the token, e.g., from localStorage
    if(token!=null)
    {
    this.username = this.jwtService.decodeToken(token);
    }
    else{
      this.username='User';
    }
   }
logout(){
this.jwtService.logout();
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
      catch(error:any)
      {
        console.error('Error from server: ',error);
        this.selected='';
        this.message=error.error;
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
      catch(error:any){
        console.error('Error from server: ',error);
        this.selected='';
        this.message=error.error;
      }
    }
    async getItem(inputData:number) {
      try{
      this.itemData=await this.apiService.getItem(inputData);
      console.log(this.itemData);
      this.formatItemData();
      this.selected='doneGetItem';
      }
      catch(error:any)
      {
        console.log(error);
        this.selected='';
        this.message=error.error;
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
