import { inject, Inject, Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, mergeMap, of } from 'rxjs';
import {
  categoryActionsSuccess,
  getCategoriesActions,
} from './category.action';

@Injectable()
export class CategoryEffects {
  private readonly categoryService = inject(CategoryService);
  private actions$ = inject(Actions);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesActions),
      mergeMap(() => {
        console.log('Effect triggered');
        return this.categoryService.getCategories().pipe(
          map((categories) => {
            console.log('Categories:', categories);
            return categoryActionsSuccess({ categories });
          }),
          catchError((error) => {
            console.error('Error:', error);
            return EMPTY;
          })
        );
      })
    )
  );
}
