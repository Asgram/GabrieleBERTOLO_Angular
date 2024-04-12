import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articolo } from '../models/articolo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getNews(): Observable<Array<Articolo>> {
    return this.http.get<Array<Articolo>>(`${this.apiUrl}/news`).pipe(
      map((news) => {
        return news;
      })
    );
  }
}
