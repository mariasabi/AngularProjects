import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData, ShortItem } from "./item.model";
import { Form } from "@angular/forms";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "./auth/user.model";
import { CartItem } from "./cartItem.model";

@Injectable({providedIn:'root'})
export class ApiService{
    
constructor(private http: HttpClient) { }


async getOrders(): Promise<any> {
  try {
      const data = await this.http.get('https://localhost:7044/getAllOrders').toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
async getOrdersOfUser(): Promise<any> {
  try {
      const data = await this.http.get('https://localhost:7044/getOrders').toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
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
async updateItems(inputData:FormData){
  const headers=new HttpHeaders({
   
    })
    const response=await this.http.put(`https://localhost:7173/api/Order/updateItem`,inputData, { headers }).toPromise();
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
async searchItem(name:string): Promise<any> {
  try {
      const data = await this.http.get(`https://localhost:7173/api/Order/searchItem?name=${name}`).toPromise();
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

async insertItems(inputData:FormData){
    const headers=new HttpHeaders({
    //     'Content-Type':'multipart/form-data'
  
      })
      try{
      const response=await this.http.post(`https://localhost:7173/api/Order/addItem`,inputData,{ headers }).toPromise();
      return response;
      }
      catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
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
async getCartItems(): Promise<any> {
  try {
      const data = await this.http.get('https://localhost:7044/getCart').toPromise();
      console.log(data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
async addCartItem(item:CartItem): Promise<any>{

  try{
    const response=await this.http.post(`https://localhost:7044/addCartItem`,item,{headers: { 'Content-Type': 'application/json' }}).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error adding cart item:', error);
      throw error;
    }
}
async incrementCartItem(item:CartItem): Promise<any>{
  try{
    const response=await this.http.put(`https://localhost:7044/incrementCartItem`,JSON.stringify(item.itemName),{headers: { 'Content-Type': 'application/json' }}).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error incrementing cart item:', error);
      throw error;
    }
}
async decrementCartItem(item:CartItem): Promise<any>{
  try{
    const response=await this.http.put(`https://localhost:7044/decrementCartItem`,JSON.stringify(item.itemName),{headers: { 'Content-Type': 'application/json' }}).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error decrementing cart item:', error);
      throw error;
    }
}
async removeCartItem(item:CartItem): Promise<any>{
  try{
    const name=encodeURIComponent(item.itemName);
    const response=await this.http.delete(`https://localhost:7044/removeCartItem?name=${name}`,{headers: { 'Content-Type': 'application/json' }}).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
}
async purchaseCart(): Promise<any>{
  try{
    const response=await this.http.delete(`https://localhost:7044/purchaseCart`,{responseType:'text', headers: { 'Content-Type': 'application/json' }}).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error purchasing cart:', error);
      throw error;
    }
}
async getUserOrders(): Promise<any>{
  try{
    const response=await this.http.get(`https://localhost:7044/getOrders`).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error retrieving user orders:', error);
      throw error;
    }
}
async getCartValue(): Promise<any>{
  try{
    const response=await this.http.get(`https://localhost:7044/getCartValue`).toPromise();
    return response;
    }
    catch (error) {
      console.error('Error retrieving cart value:', error);
      throw error;
    }
}
}