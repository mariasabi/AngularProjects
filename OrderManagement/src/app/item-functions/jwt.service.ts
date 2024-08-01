import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { delay, of, Subscription } from 'rxjs';

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
tokenSubscription = new Subscription();

constructor(private router:Router){};
  // Method to decode the JWT token
  decodeToken(tkn: string): any {
    
    this.helper = new JwtHelperService();
    if(tkn) {
      this.token = tkn;
      this.decodedToken = this.helper.decodeToken(tkn);
//console.log(this.decodedToken);
      this.expirationDate = this.helper.getTokenExpirationDate(tkn).valueOf() - new Date().valueOf();
      this.isExpired = this.helper.isTokenExpired(tkn);
      this.username = this.decodedToken ? this.decodedToken.username : null; // Access the username from the decoded token
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
    this.router.navigate(['/login']); // Redirect to login page
    console.log('User logged out');
    }
    isLoggedIn(): boolean {
      return !!localStorage.getItem('authToken');
    }
  

}
