import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import {User } from './user.model';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../error-message/error-message.component";
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule,ErrorMessageComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent{
constructor(@Inject(LOCALE_ID) public locale: string,private http:HttpClient,private apiService:ApiService,private router:Router){
}
buttonName:string='Login';
displayButton:string=$localize`Login`;
isSignup:boolean=false;
//showMessage:boolean=false;
message:string=``;
user:User={
  username:'',
  email:'',
  password:''
};
resetUser={
  username:'',
  oldpassword:'',
  newpassword:''
}

onSubmit()
{
 
  this.message='';
  if(this.buttonName=='Login')
    this.login(this.user);
  else
    this.register(this.user);
}
onReset()
{
  if(this.resetUser.username==''||this.resetUser.oldpassword==''||this.resetUser.newpassword=='')
    {
      //this.showMessage=true;
      this.message=$localize`Some fields are empty`;
    }
  else
  {
  this.apiService.resetUser(this.resetUser).subscribe((res)=>
    {     
     // this.showMessage=true;
      this.message=$localize`Reset successful`;
    },
    (error:any)=>
    {
      console.error('Reset failed:', error);
      //this.showMessage=true;
      if(error.status==400)
      this.message=$localize`Username or old password is not valid.`;
      else
      this.message=$localize`Unknown error`;
    });
  }
}

public login(user:User)
{
  console.log(user);
  if(user.username==''||user.password=='')
  {
    //this.showMessage=true;
    this.message=$localize`Some fields are empty`;
  }
  else
  {
  this.apiService.loginUser(user).subscribe((token:string)=>{
  
      localStorage.setItem('authToken', token);   
      console.log('Login successful');
     this.router.navigate(['/home']);
    },
    (error: any) => {
       
      console.error('Login failed:', error);
     // this.showMessage=true;
     if(error.status==400)
      this.message=$localize`Login failed`;
    else
      this.message=$localize`Unknown error`;
    }
  );
  }
}
signup()
{
  this.message='';
  this.buttonName=`Register`;
  this.displayButton=$localize`Register`;
}
back()
{
  this.message='';
  this.buttonName=`Login`;
  this.displayButton=$localize`Login`;
}
forgotPassword(){
  this.message='';
  this.buttonName=`Reset password`;
  this.displayButton=$localize`Reset password`;
}
public register(user:User)
{
  if(user.email==''||user.username==''||user.password=='')
    {
     // this.showMessage=true;
      this.message=$localize`Some fields are empty`;
    }
  else
  {
  this.apiService.registerUser(user).subscribe((res)=>
  {
    this.message=$localize`Register successful`;
  
  },
  (error:any)=>
  {
    console.error('Register failed:', error);
    //this.showMessage=true;
    if(error.status==400)
      this.message=$localize`Such a user already exists.`;
    else
      this.message=$localize`Unknown error`;
  });
}
}
}
