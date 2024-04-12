import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../users/models/user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  username!: string;

  constructor(private authService: AuthService) {
    this.userLogged$ = this.authService.userLogged$;
  }
}
