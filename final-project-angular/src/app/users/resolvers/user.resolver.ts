import { ResolveFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';
import { mergeMap, of, EMPTY, catchError } from 'rxjs';
import { User } from '../models/user';

export const userResolver: ResolveFn<User> = (route, state) => {
  const router: Router = inject(Router);
  const usersService: UsersService = inject(UsersService);
  const id: string = route.queryParamMap.get('userId') ?? '';

  if (id) {
    return usersService.getAuthUserById(id).pipe(
      mergeMap((user) => {
        if (user) {
          return of(user);
        } else {
          router.navigate(['']);
          return EMPTY;
        }
      }),
      catchError((error) => {
        window.alert('User not found');
        router.navigate(['']);
        return EMPTY;
      })
    );
  } else {
    router.navigate(['']);
    return EMPTY;
  }
};
