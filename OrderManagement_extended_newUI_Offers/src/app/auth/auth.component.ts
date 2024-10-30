import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { RoleSelectionComponent } from '../role-selection/role-selection.component';
import { NgOtpInputModule } from  'ng-otp-input';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule,ErrorMessageComponent,NgOtpInputModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
constructor(private dialog: MatDialog,private jwtService:JwtService,private http:HttpClient,private apiService:ApiService,private router:Router){

}
@ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
buttonName:string='Login';
displayButton:string=$localize`Login`;
isSignup:boolean=false;
language: string | null = null;
username!:any;
isAdmin!:boolean;
otpCode: string = ''; 
step:number=1;
//showMessage:boolean=false;
message:string=``;
user:User={
  username:'',
  email:'',
  password:'',
  hindiName:''
};
resetUser={
  email:'',
  newPassword:''
}
  config = {
    length: 6,  
    inputClass: 'otp-input',  
    allowNumbersOnly: true,  
    isPasswordInput: false,  
  };
ngOnInit(): void {
  this.language = this.getLanguageFromWindow();
}
private getLanguageFromWindow(): string {
  const path = window.location.pathname; 
  const segments = path.split('/'); 
  return segments[1]; 
}
onSubmit()
{
  this.message='';
  if(this.buttonName=='Login')
    this.login(this.user);
  else
    this.register(this.user);
}
onOtpChange(otp: string) {
  this.otpCode = otp;
  console.log('Current OTP:', this.otpCode);
}

onReset()
{
  if(this.resetUser.email=='')
    {

      this.message=$localize`Please enter email`;
    }
  else
  {
  this.apiService.forgotPassword(this.resetUser.email).subscribe((res)=>
    {     

      this.step=2 
      this.displayButton = $localize`Verify OTP`;
    },
    (error:any)=>
    {
      console.error('OTP generation failed:', error);

      if(error.status==400)
      this.message='Email not found';
      else
      this.message=$localize`Unknown error`;
    });
  }
}
onVerifyOtp() {
  if (this.otpCode === '') {
    this.message = $localize`Please enter the OTP`;
  } else {
    this.apiService.validateOTP(this.resetUser.email, this.otpCode).subscribe(
      (res) => {

        this.step=3;
        this.displayButton = $localize`Submit`;
      },
      (error: any) => {
        console.error('OTP verification failed:', error);
        this.message = $localize`Invalid OTP or error occurred`;
      }
    );
  }
}
onSubmitNewPassword() {
  if (this.resetUser.newPassword === '') {
    this.message = $localize`Please enter a new password`;
  } else {
    this.apiService.resetPassword(this.resetUser).subscribe(
      (res) => {
        this.buttonName='Login';
        this.message = $localize`Password reset successfully!`;
        this.step=1;
      },
      (error: any) => {
        console.error('Password reset failed:', error);
        this.message = $localize`Error occurred while resetting password`;
      }
    );
  }
}
public login(user:User)
{
  console.log(user);
  if(user.username==''||user.password=='')
  {

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
        {
          const dialogRef = this.dialog.open(RoleSelectionComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result === 'Admin') {
              this.router.navigate(['/admin'],{ queryParams: {name: this.username }})   ;
            } else if (result === 'User') {
              this.router.navigate(['/user'],{ queryParams: {name: this.username }});    
            }});
        }
          
        else
        this.router.navigate(['/user'],{ queryParams: {name: this.username }});    
              
      }); 

    },
    (error: any) => {
       
      console.error('Login failed:', error);
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
        resolve();  
      }
    );
  });
}
private async decodeToken():Promise<void>
{
  const token = localStorage.getItem('authToken');  

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
  this.displayButton=$localize`Send OTP`;
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
    this.user={
      username:'',
      email:'',
      password:'',
      hindiName:''
    };
    this.buttonName='Login';
  },
  (error:any)=>
  {
    console.error('Register failed:', error);
    //this.showMessage=true;
    if(error.status==400)
      this.message=error.error;
    else
      this.message=$localize`Unknown error`;
  });
}
}
}
