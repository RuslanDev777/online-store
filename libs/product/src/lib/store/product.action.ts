import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    LoadProduct: emptyProps(),
    LoadProductByCategory: props<{ category: string }>(),
    ProductSuccess: props<{ products: Product[] }>(),
    ProductFailure: props<{ error: string }>(),
  },
});
