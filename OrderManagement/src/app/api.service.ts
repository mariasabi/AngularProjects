import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemData } from "./item.model";

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
     await this.http.put<ItemData>('https://localhost:7196/api/DynamicOrder/updateItemDynamic',inputData, { headers }).subscribe({
        next: response => {
          console.log('Update successful:', response);
        },
        error: error => {
          console.error('Update failed:', error);
        }
      });
}
async deleteItem(inputData:number){
    const headers=new HttpHeaders({
        'Content-Type':'application/json'
      })
      await this.http.delete<number>(`https://localhost:7196/api/Order/deleteItem?id=${inputData}`, { headers }).subscribe({
        next: response => {
          console.log('Delete successful:', response);
        },
        error: error => {
          console.error('Delete failed:', error);
        }
      });
}
async getItem(inputData:number): Promise<any> {
    try {
        const data = await this.http.get(`https://localhost:7196/api/Order/getItem?id=${inputData}`).toPromise();
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
      await this.http.post<ItemData>('https://localhost:7196/api/Order/addItem',inputData, { headers }).subscribe({
        next: response => {
          console.log('Insert successful:', response);
        },
        error: error => {
          console.error('Insert failed:', error);
        }
      });
}

}