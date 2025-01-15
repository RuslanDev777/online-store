import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { cartActions } from '../store/cart.action';
import { selectCart } from '../store/cart.selector';

@Component({
  selector: 'lib-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly store = inject(Store);
  cart$ = this.store.select(selectCart);

  ngOnInit(): void {
    this.store.dispatch(cartActions.loadCart());
  }
}
