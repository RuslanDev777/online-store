import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from './cart.action';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);

  getCart() {
    return this.http.get<Cart[]>(`https://fakestoreapi.com/carts`);
  }

  getCartById(id: number) {
    return this.http.get<Cart>(`https://fakestoreapi.com/carts/${id}`);
  }
}
