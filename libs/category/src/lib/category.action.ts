import { createAction, props } from '@ngrx/store';

export const getCategoriesActions = createAction('[Category] Get Categories');
export const categoryActionsSuccess = createAction(
  '[Category] Get Categories Success',
  props<{ categories: string[] }>()
);
export const categoryActionsFailure = createAction(
  '[Category] Get Categories Failure',
  props<{ error: string }>()
);
