import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from '../item-functions/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private jwtService:JwtService, private router: Router) { }

  canActivate(): boolean {
    if (this.jwtService.isLoggedIn()) {
      if(this.jwtService.isAdmin())
      return true;
      else
      return false;
    } else {
     console.log('Login to go to home Url');
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
