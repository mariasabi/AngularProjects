import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import {User } from './user.model';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { TranslateService } from '@ngx-translate/core';
import '@angular/localize/init'; // Ensure this import is present
import { JwtService } from '../item-functions/jwt.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule,ErrorMessageComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
constructor(private jwtService:JwtService,private http:HttpClient,private apiService:ApiService,private router:Router){

}
buttonName:string='Login';
displayButton:string=$localize`Login`;
isSignup:boolean=false;
language: string | null = null;
username!:any;
isAdmin!:boolean;
//showMessage:boolean=false;
message:string=``;
user:User={
  username:'',
  email:'',
  password:'',
  hindiName:''
};
resetUser={
  username:'',
  oldpassword:'',
  newpassword:''
}
ngOnInit(): void {
  this.language = this.getLanguageFromWindow();
}
private getLanguageFromWindow(): string {
  const path = window.location.pathname; // Full path like '/hi/home'
  const segments = path.split('/');  // ['', 'hi', 'home']
  return segments[1]; // The first segment should be the language code
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
    
  this.apiService.loginUser(user).subscribe(async (token:string)=>{
  
      localStorage.setItem('authToken', token);
      console.log(this.language);
      this.decodeToken().then(()=>
      {
        console.log('Login successful');
        console.log('Before navigation: ',this.username);
        if(this.isAdmin)
          this.router.navigate(['/admin'],{ queryParams: {name: this.username }});
        else
         this.router.navigate(['/user'],{ queryParams: {name: this.username }});         
      }); 

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


private getHindiName(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.apiService.getHindiName(this.username).subscribe(
      (name: string) => {
        this.username = name;
        console.log('In get Hindi name:', this.username);
        resolve();
      },
      (error: any) => {
        console.error(error);
        resolve();  // Proceed even if there's an error
      }
    );
  });
}
private async decodeToken():Promise<void>
{
  const token = localStorage.getItem('authToken');  // Method to get the token, e.g., from localStorage

  if(token!=null)
    {
    this.username = this.jwtService.decodeToken(token);
    this.isAdmin=this.jwtService.isAdmin();
      if(this.language==='hi')
        await this.getHindiName();    
    }
    else{
      this.username='User';
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
    console.log(user);
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
