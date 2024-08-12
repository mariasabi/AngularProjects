import { Component, Input, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import '@angular/localize/init'; 
@Component({
  selector: 'app-item-functions',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessMessageComponent, GridItemsComponent, PageItemsComponent, UploadComponent, UpdateItemsComponent, DeleteItemComponent],
  templateUrl: './item-functions.component.html',
  styleUrl: './item-functions.component.css'
})
export class ItemFunctionsComponent implements OnInit{
  userName!: string;
    constructor(private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService){}
    title = $localize`Order Management Application`;
    itemData:any;
    itemEntries:any;
    selected?:string;
   message:string='';
   response!:any;
   buttonName!:string;

   ngOnInit(): void {

    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { userName:string};
    // if (state && state.userName) {
    //   this.userName = state.userName;
    //   console.log('In admin', this.userName);
    // } else {
    //   console.log('No state passed');
    // }

    this.route.queryParams.subscribe(params => {
       this.userName = params['name'];
       console.log(this.userName);
    });
   }

logout(){
this.jwtService.logout();
}
    onUpdateData(){
        this.message='';
        this.selected="update";
        this.buttonName=$localize`Update`;
    }
    onInsertData(){
      this.message='';
      this.selected="insert";
      this.buttonName=$localize`Insert`;
  }
  onDeleteData(){
    this.message='';
    this.selected="delete";
    this.buttonName=$localize`Delete`;
  }
  onGetItem(){
    this.message='';
    this.selected="getItem";
    this.buttonName=$localize`Get Item`;
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
      this.message=$localize`Updated successfully!`;
     }
      catch(error:any)
      {
        console.error('Error from server: ',error);
        this.selected='';
        if(error.status==404)
        this.message=$localize`No such item exists`;
        else
        this.message=$localize`Unknown error`;
      }
    }
    async insertData(inputData:ItemData) {
      await this.apiService.insertItems(inputData);
      this.selected='';
      this.message=$localize`Inserted successfully!`;
    }
    async deleteData(inputData:number) {
      try{
      await this.apiService.deleteItem(inputData);
      this.selected='';
      this.message=$localize`Deleted successfully!`;
      }
      catch(error:any){
        console.error('Error from server: ',error);
        this.selected='';
        if(error.status==404)
        this.message=$localize`No such item exists`;
        else
        this.message=$localize`Unknown error`;
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
        if(error.status==404)
        this.message=$localize`No such item exists`;
        else
        this.message=$localize`Unknown error`;
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
