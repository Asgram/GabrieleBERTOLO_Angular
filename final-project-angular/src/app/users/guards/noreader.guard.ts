import { CanActivateFn } from '@angular/router';

export const noreaderGuard: CanActivateFn = (route, state) => {
  return true;
};
