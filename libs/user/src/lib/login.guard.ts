import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LoginService } from './store/login.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const isLoggetIn = inject(LoginService).isLoggetIn;
  const router = inject(Router);

  if (isLoggetIn) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
