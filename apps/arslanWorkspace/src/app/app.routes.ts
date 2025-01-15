import { animation } from '@angular/animations';
import { Route } from '@angular/router';
import { cartFeature, loadCart } from '@arslan-workspace/cart';
import {
  productFeature,
  loadProducts,
  loadProductsByCategories,
} from '@arslan-workspace/product';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },

  {
    path: 'product',
    loadComponent: () =>
      import('@arslan-workspace/product').then((m) => m.ProductComponent),
    providers: [
      provideState(productFeature),
      provideEffects({ loadProducts, loadProductsByCategories }),
    ],
  },
  {
    path: 'product/:categoryName',
    loadComponent: () =>
      import('@arslan-workspace/product').then((m) => m.ProductComponent),
    data: {
      animation: 'categoryPage',
    },
    providers: [
      provideState(productFeature),
      provideEffects({ loadProducts, loadProductsByCategories }),
    ],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('@arslan-workspace/cart').then((m) => m.CartComponent),
    providers: [provideState(cartFeature), provideEffects({ loadCart })],
  },
];
