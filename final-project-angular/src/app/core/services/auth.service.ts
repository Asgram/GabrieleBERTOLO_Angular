import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../users/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000';
  redirectNoAuthUrl: string = '/login';

  isLoggedIn: boolean = false;
  userLogged: User | null = null;

  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private http: HttpClient) {}

  getAuthUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/authUsers`).pipe(
      map((aUsers) => {
        return aUsers;
      })
    );
  }

  login(user: User): Observable<boolean> {
    return this.checkUser(user).pipe(
      map((res) => {
        if (res) {
          this.isLoggedIn = true;
          //this.userLogged = res;
          this.userLogged$.next(res);
          console.log(this.userLogged);
          return true;
        } else {
          this.isLoggedIn = false;
          //this.userLogged = null;
          this.userLogged$.next(null);
          return false;
        }
      })
    );
  }

  signin(user: User): Observable<boolean> {
    return this.checkUser(user, false).pipe(
      map((res) => {
        if (res) {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/authUsers`, new User(user))
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    //this.userLogged = null;
    this.userLogged$.next(null);
  }

  checkUser(user: User, isLogin: boolean = true): Observable<User> {
    const options = {
      params: new HttpParams().set('username', user.username),
    };

    if (isLogin) options.params.set('password', user.password);

    return this.http
      .get<Array<User>>(`${this.apiUrl}/authUsers`, options)
      .pipe(map((res) => res[0]));
  }
}
