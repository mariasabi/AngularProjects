import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData } from "./item.model";
import { Form } from "@angular/forms";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./auth/user.model";

@Injectable({providedIn:'root'})
export class ApiService{
    
constructor(private http: HttpClient) { }


async getUsers(): Promise<any> {
  try {
      const data = await this.http.get('https://localhost:7044/api/Admin/getUsers').toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
async deleteUser(inputData:string){
  const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    const response=await this.http.delete<number>(`https://localhost:7044/api/Admin/deleteUser?name=${inputData}`, { headers }).toPromise();
    return response;
}
async getUserByUsername(inputData:string): Promise<any> {
    
        const data = await this.http.get(`https://localhost:7044/api/Admin/getUserByUsername?name=${inputData}`).toPromise();
        console.log(data);
        return data;
    
}
async getUserById(inputData:number): Promise<any> {
    
  const data = await this.http.get(`https://localhost:7044/api/Admin/getUserById?id=${inputData}`).toPromise();
  console.log(data);
  return data;

}
public loginUser(user:User):Observable<string>{
return this.http.post('https://localhost:7044/api/User/login',user,
  {responseType:'text'}
);
}
public registerUser(user:User):Observable<string>{
  return this.http.post('https://localhost:7044/api/User/register',user,
    {responseType:'text',}
  );
}
public resetUser(user:any):Observable<string>{
  return this.http.put('https://localhost:7044/api/User/resetPassword',user,
    {responseType:'text',}
  );
}
public getHindiName(username:string):Observable<string>{
  return this.http.get(`https://localhost:7044/api/User/getHindiName?name=${username}`, {responseType:'text',});
  }
async updateItems(inputData:ItemData){
  const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
     const response=await this.http.put<ItemData>('https://localhost:7173/api/Order/updateItem',inputData, { headers }).toPromise();
     return response;  
}

async deleteItem(inputData:number){
  const headers=new HttpHeaders({
      'Content-Type':'application/json'
    })
    const response=await this.http.delete<number>(`https://localhost:7173/api/Order/deleteItem?id=${inputData}`, { headers }).toPromise();
    return response;
}
async getItem(inputData:number): Promise<any> {
    
        const data = await this.http.get(`https://localhost:7173/api/Order/getItem?id=${inputData}`).toPromise();
        console.log(data);
        return data;
    
}
async getItems(): Promise<any> {
  try {
      const data = await this.http.get('https://localhost:7173/api/Order/getItems').toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
async getPageItem(page: number, pageSize: number): Promise<any> {
  try {
      const data = await this.http.get(`https://localhost:7173/api/Order/getPaginatedItems?page=${page}&pageSize=${pageSize}`).toPromise();
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
      const response=await this.http.post<ItemData>('https://localhost:7173/api/Order/addItem',inputData, { headers }).toPromise();
      return response;
}

 async bulkInsert(formData: FormData){
  
  try {
    const response = await this.http.post<any>('https://localhost:7173/api/Order/bulkaddItemsDynamic', formData, {
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