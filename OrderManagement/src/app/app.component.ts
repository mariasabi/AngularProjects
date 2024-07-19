import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemData } from './item.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  constructor(private http: HttpClient) { }
  title = 'Order Management Application';
  itemData:any;
  selected?:string;

  fetchData() {
    this.http.get('https://localhost:7196/api/Order/getItems').subscribe(data => {
      console.log(data);
      this.itemData=data;
    });
    this.selected='fetch'
  }

  onUpdateData(){
        this.selected="update";
  }

  updateData(inputData:ItemData) {
    const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    this.http.put<ItemData>('https://localhost:7196/api/DynamicOrder/updateItemDynamic',inputData, { headers }).subscribe({
      next: response => {
        console.log('Update successful:', response);
      },
      error: error => {
        console.error('Update failed:', error);
      }
    });
    this.selected='';
}
}
