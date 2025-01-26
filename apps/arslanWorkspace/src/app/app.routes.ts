import { Route } from '@angular/router';
import { loadCartById, loadCart, cartFeature } from '@arslan-workspace/store';
import {
  productFeature,
  loadProducts,
  loadProductsByCategories,
} from '@arslan-workspace/store';
import { authGuard } from '@arslan-workspace/user';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@arslan-workspace/user').then((m) => m.LoginComponent),
  },

  {
    path: 'product',
    loadComponent: () =>
      import('@arslan-workspace/product').then((m) => m.ProductComponent),
    providers: [
      provideState(productFeature),
      provideState(cartFeature),
      provideEffects({ loadProducts, loadProductsByCategories }),
    ],
    canMatch: [authGuard],
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
    canMatch: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('@arslan-workspace/cart').then((m) => m.CartComponent),
    providers: [provideEffects({ loadCart, loadCartById })],
    canMatch: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@arslan-workspace/user').then((m) => m.ProfileComponent),
    canMatch: [authGuard],
  },
];
