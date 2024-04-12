import { ResolveFn, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { inject } from '@angular/core';
import { mergeMap, of, EMPTY, catchError } from 'rxjs';
import { Articolo } from '../models/articolo';

export const newsDetailResolver: ResolveFn<Articolo> = (route, state) => {
  const router: Router = inject(Router);
  const newsService: NewsService = inject(NewsService);
  const id: string = route.queryParamMap.get('newsID') ?? '';

  if (id) {
    return newsService.getNewsByID(id).pipe(
      mergeMap((news) => {
        if (news) {
          return of(news);
        } else {
          router.navigate(['']);
          return EMPTY;
        }
      }),
      catchError((error) => {
        window.alert('News not found');
        router.navigate(['']);
        return EMPTY;
      })
    );
  } else {
    router.navigate(['']);
    return EMPTY;
  }
};
