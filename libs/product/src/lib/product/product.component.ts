import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Product, productActions } from '@arslan-workspace/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { productFeature } from '@arslan-workspace/store';
import { cartActions } from 'libs/common/store/src/lib/cart/cart.action';

@Component({
  selector: 'lib-product',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly store = inject(Store);
  @Input() set categoryName(name: string) {
    if (name) {
      this.store.dispatch(
        productActions.loadProductByCategory({ category: name })
      );
    } else {
      this.store.dispatch(productActions.loadProduct());
    }
  }

  products$ = this.store.select(productFeature.selectProducts);

  ngOnInit(): void {
    // this.store.dispatch(productActions.loadProduct());
  }

  addToCart(product: Product) {
    this.store.dispatch(cartActions.addProductToCart({ product }));
  }
}
