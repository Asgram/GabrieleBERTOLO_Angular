import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

export const noreaderGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  if (!authService.userLogged$.value) return false;

  return !(authService.userLogged$.value?.ruolo == 'Lettore');
};
