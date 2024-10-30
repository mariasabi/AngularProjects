import { Component, OnInit } from '@angular/core';
import { ItemData } from '../item.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { JwtService } from '../item-functions/jwt.service';
import { GridItemsComponent } from "../item-functions/grid-items/grid-items.component";
import { PageItemsComponent } from "../item-functions/page-items/page-items.component";
import { UploadComponent } from "../item-functions/editable-grid-items/upload/upload.component";
import { UpdateItemsComponent } from "../item-functions/update-items/update-items.component";
import { DeleteItemComponent } from "../item-functions/delete-item/delete-item.component";
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { CommonModule } from '@angular/common';
import { GridUsersComponent } from "./grid-users/grid-users.component";
import { DeleteUserComponent } from "./delete-user/delete-user.component";
import { UserData } from './user.model';
import { GridOrdersComponent } from "./grid-orders/grid-orders.component";
import { OrderData } from '../order.model';
import { EditableGridItemsComponent } from '../item-functions/editable-grid-items/editable-grid-items.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,GridItemsComponent, CommonModule, PageItemsComponent, UploadComponent, UpdateItemsComponent, DeleteItemComponent, SuccessMessageComponent, GridUsersComponent, DeleteUserComponent, GridOrdersComponent, EditableGridItemsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  userData!:UserData[];
  orderData!:OrderData[];
  language!: string;
  userEntries:any;
  constructor(private route:ActivatedRoute,private router:Router,private apiService:ApiService,private jwtService:JwtService){}
  title = $localize`Quick Buy`;
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

logout(){
  this.jwtService.logout();
  }

  }
