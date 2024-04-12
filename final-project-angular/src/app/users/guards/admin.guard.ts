import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (!authService.userLogged$.value) return false;
  return authService.userLogged$.value?.ruolo == 'Admin';
};
