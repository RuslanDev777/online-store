import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface Cart {
  id: number;
  userId: number;
  date: Date;
  products: [
    {
      productId: number;
      quantity: number;
    }
  ];
}

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    LoadCart: emptyProps(),

    CartSuccess: props<{ cart: Cart[] }>(),
    CartFailure: props<{ error: string }>(),
  },
});
