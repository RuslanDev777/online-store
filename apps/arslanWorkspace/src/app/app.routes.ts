import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'category/:categoryName',
    loadComponent: () =>
      import('@arslan-workspace/product').then((m) => m.ProductComponent),
  },
];
