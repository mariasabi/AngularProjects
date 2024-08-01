import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData } from './item.model';
import { ApiService } from './api.service';
import { AuthComponent } from './auth/auth.component';
import { ItemFunctionsComponent } from './item-functions/item-functions.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
 
}