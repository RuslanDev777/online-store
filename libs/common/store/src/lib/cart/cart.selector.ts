import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { CartState, cartReducer } from './cart.reducer';
import { userFeature } from '../user/user.state';
import { productFeature } from '../product/product.state';
import { Product } from '../product/product';

const cartFeatureKey = 'cart';

export const selectCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCart = createSelector(
  selectCartState,
  (state) => state.cart
);

export const selectCurrentCart = createSelector(
  selectCartState,
  (state) => state.currentCart
);

export const cartFeature = createFeature({
  name: cartFeatureKey,
  reducer: cartReducer,
});

export const userCartSelector = createSelector(
  selectCurrentCart,
  userFeature.selectUser,

  productFeature.selectProducts,
  (cart, user, products) => {
    console.log('Cart:', cart); // Проверяем currentCart
    console.log('User:', user); // Проверяем user
    console.log('Products:', products); // Проверяем products
    if (cart && user) {
      const cartproduct: Product[] = cart.products
        .map((p) => {
          const product = products.find(
            (product) => product.id === p.productId
          );
          if (product) {
            return {
              ...product,
              quantity: p.quantity,
            };
          }
          return null;
        })
        .filter((product): product is Product => product !== null); // Убираем null с указанием типа

      return {
        ...cart,
        user,
        ProductDetails: cartproduct,
      };
    }
    return undefined;
  }
);
