import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { cartActions } from '../../../../common/store/src/lib/cart/cart.action';
import { selectCart, userCartSelector } from '@arslan-workspace/store';
import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '@arslan-workspace/store';

@Component({
  selector: 'lib-cart',
  imports: [CommonModule, ProductListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly store = inject(Store);
  cart$ = this.store.select(userCartSelector);

  ngOnInit(): void {
    this.cart$.subscribe((data) => {
      console.log('Cart Data:', data);
    });
    // this.store.dispatch(cartActions.loadCart());
    // this.store.dispatch(cartActions.loadCartById({ id: 3 }));
  }

  delete(product: Product) {
    console.log(product);
  }
}
