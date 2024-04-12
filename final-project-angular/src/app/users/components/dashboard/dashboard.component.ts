import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  authUser!: User | null;
  hide: boolean = true;

  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  destroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {
    this.userLogged$ = this.authService.userLogged$;
    this.userLogged$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.authUser = data ?? null;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([this.authService.redirectNoAuthUrl]);
  }
}
