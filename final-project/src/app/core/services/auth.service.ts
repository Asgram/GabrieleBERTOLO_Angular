import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../users/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000';
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
}
