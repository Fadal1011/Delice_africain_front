import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';

export const notRetainAuthGuard: CanActivateFn = (route, state) => {
  const autService = inject(LoginService);
  const router = inject(Router);

  if(autService.isAuthenticate()){
    router.navigateByUrl("");
    return false;
  }
  return true;
};
