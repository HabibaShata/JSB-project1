import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from 'src/app/features/auth/interfaces/auth';

export const userPortalGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (localStorage.getItem('role') === UserRole.SystemUser) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
