import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
helper!:any;
token!:any;
decodedToken!:any;
expirationDate!:any;
isExpired!:any;
username!:any;

constructor(private router:Router){};

  decodeToken(tkn: string): any {
    
    this.helper = new JwtHelperService();
    if(tkn) {
      this.token = tkn;
      this.decodedToken = this.helper.decodeToken(tkn);
//console.log(this.decodedToken);
      this.expirationDate = this.helper.getTokenExpirationDate(tkn).valueOf() - new Date().valueOf();
      this.isExpired = this.helper.isTokenExpired(tkn);

    this.username=this.decodedToken.username;  
    this.expirationCounter(this.expirationDate);
      // console.log('Username:', this.username);
      return this.username;
      }
  }
  expirationCounter(timeout:number) {
    setTimeout(() => {
      this.logout();
    }, this.expirationDate);

  }
    
    logout() {
      localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
    console.log('User logged out');
    }
    isLoggedIn(): boolean {
      return !!localStorage.getItem('authToken');
    }
  

}
