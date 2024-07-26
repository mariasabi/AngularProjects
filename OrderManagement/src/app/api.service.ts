import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData } from "./item.model";
import { Form } from "@angular/forms";
import { catchError, throwError } from "rxjs";

@Injectable({providedIn:'root'})
export class ApiService{
    
constructor(private http: HttpClient) { }

async getItems(): Promise<any> {
    try {
        const data = await this.http.get('https://localhost:7196/api/Order/getItems').toPromise();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async updateItems(inputData:ItemData){
  const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
     const response=await this.http.put<ItemData>('https://localhost:7196/api/DynamicOrder/updateItemDynamic',inputData, { headers }).toPromise();
     return response;  
}

async deleteItem(inputData:number){
  const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    const response=await this.http.delete<number>(`https://localhost:7196/api/Order/deleteItem?id=${inputData}`, { headers }).toPromise();
    return response;
}
async getItem(inputData:number): Promise<any> {
    
        const data = await this.http.get(`https://localhost:7196/api/Order/getItem?id=${inputData}`).toPromise();
        console.log(data);
        return data;
    
}

async getPageItem(page: number, pageSize: number): Promise<any> {
  try {
      const data = await this.http.get(`https://localhost:7196/api/Order/getPaginatedItems?page=${page}&pageSize=${pageSize}`).toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async insertItems(inputData:ItemData){
    const headers=new HttpHeaders({
        'Content-Type':'application/json'
      })
      const response=await this.http.post<ItemData>('https://localhost:7196/api/Order/addItem',inputData, { headers }).toPromise();
      return response;
}

 async bulkInsert(formData: FormData){
  
  try {
    const response = await this.http.post<any>('https://localhost:7196/api/DynamicOrder/bulkaddItemsDynamic', formData, {
      responseType: 'text' as 'json',
      reportProgress: true,
      observe: 'events'
    }).toPromise();

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

}