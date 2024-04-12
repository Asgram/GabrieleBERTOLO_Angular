import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getAuthUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/authUsers`).pipe(
      map((aUsers) => {
        return aUsers;
      })
    );
  }

  getAuthUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/authUsers/${id}`).pipe(
      map((user) => {
        return user;
      })
    );
  }
}
