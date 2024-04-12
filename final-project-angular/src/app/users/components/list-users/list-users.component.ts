import { Component, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnDestroy {
  users$!: Observable<Array<User>>;
  destroy$: Subject<void> = new Subject<void>();

  users!: Array<User>;

  constructor(private userService: UsersService) {
    this.users$ = this.userService.getAuthUsers();
    this.users$.pipe(takeUntil(this.destroy$)).subscribe((u) => {
      console.log(u);
      this.users = u;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
