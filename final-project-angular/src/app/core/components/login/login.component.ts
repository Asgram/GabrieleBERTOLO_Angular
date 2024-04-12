import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginAttempt: boolean = true;
  hide: boolean = true;

  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;

  isWrongAttempt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.username = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);

    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }

  login(isLogin: boolean = true): void {
    if (isLogin) {
      this.isLoginAttempt = true;
      this.authService
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe(() => {
          if (this.authService.isLoggedIn) this.router.navigate(['user']);
          else this.isWrongAttempt$.next(true);
        });
    } else {
      this.isLoginAttempt = false;
      this.authService
        .signin(this.loginForm.value)
        .pipe(take(1))
        .subscribe((log) => {
          if (log) {
            this.authService
              .registerUser(this.loginForm.value)
              .pipe(take(1))
              .subscribe((log) => {
                if (log) this.login();
                else this.isWrongAttempt$.next(true);
              });
          } else {
            this.username.setErrors({ usernameInUse: true });
          }
        });
    }
  }
}
