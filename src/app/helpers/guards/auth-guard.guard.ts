import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if (authService.isAuthenticate()) {
    return true;
  }
  // if(authService.getUser())
  router.navigateByUrl('/auth');
  return false;
};
