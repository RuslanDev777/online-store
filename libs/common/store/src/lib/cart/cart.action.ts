import { Product } from '../product/product';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user/user.interface';

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: Date;
  user?: User;
  products: CartProduct[];
  ProductDetails: Product[];
}

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    LoadCart: emptyProps(),

    CartSuccess: props<{ cart: Cart[] }>(),
    CartFailure: props<{ error: string }>(),
    loadCartById: props<{ id: number }>(),
    cartByIdSuccess: props<{ cart: Cart }>(),
    cartByIdFailure: props<{ error: string }>(),
    addProductToCart: props<{ product: Product }>(),
  },
});
