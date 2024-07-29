import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {User } from './user.model';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
constructor(private http:HttpClient,private apiService:ApiService){
}
@Input() buttonName:string='login';
user:User={
  username:'',
  email:'',
  password:''
};
onSubmit()
{
  if(this.buttonName=='login')
    this.login(this.user);
  else
    this.register(this.user);
}

public login(user:User){
  this.apiService.loginUser(user).subscribe((token:string)=>{
    localStorage.setItem('authToken',token);
  });
}
public register(user:User){
  this.apiService.registerUser(user).subscribe();
}
}
