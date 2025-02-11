import { CanActivateFn, Router } from '@angular/router';
import { UserService ,} from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const userService = inject(UserService);
  if (!userService.isLoggedin()) {
    router.navigateByUrl('create-account');
    return false;
  }
  return true;
};

/// generate a new component on home - budget