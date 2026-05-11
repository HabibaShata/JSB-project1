import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
