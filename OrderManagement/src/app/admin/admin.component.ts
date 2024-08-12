import { Component, OnInit } from '@angular/core';
import { ItemData } from '../item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { JwtService } from '../item-functions/jwt.service';
import { GridItemsComponent } from "../item-functions/grid-items/grid-items.component";
import { PageItemsComponent } from "../item-functions/page-items/page-items.component";
import { UploadComponent } from "../item-functions/upload/upload.component";
import { UpdateItemsComponent } from "../item-functions/update-items/update-items.component";
import { DeleteItemComponent } from "../item-functions/delete-item/delete-item.component";
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [GridItemsComponent,CommonModule, PageItemsComponent, UploadComponent, UpdateItemsComponent, DeleteItemComponent, SuccessMessageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  language!: string;
  constructor(private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService){}
  title = $localize`Order Management Application`;
  itemData:any;
  itemEntries:any;
  selected?:string;
 message:string='';
 response!:any;
userName!:string;


 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.userName = params['name'];
    console.log(this.userName);
 });
  
 }

 buttonName!:string;
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
    
