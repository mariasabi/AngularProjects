import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemNoSubject = new BehaviorSubject<number>(0);
  cartItemNo$ = this.cartItemNoSubject.asObservable();

  updateCartItemNo(count: number) {
    this.cartItemNoSubject.next(count);
  }
}
