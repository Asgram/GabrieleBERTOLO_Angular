import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { Articolo } from '../../core/models/articolo';
import { NewsService } from '../../core/services/news.service';

export const newsResolver: ResolveFn<Articolo | null> = (route, state) => {
  const newsService: NewsService = inject(NewsService);
  const id: string | null = route.queryParamMap.get('newsId');

  // Resolve di ipotetico dettaglio con path ":studentId"
  // const id: string = route.paramMap.get('studentId');

  if (id) {
    return newsService.getNewsByID(id).pipe(
      mergeMap((news) => {
        if (news) {
          return of(news);
        } else {
          return of(null);
        }
      })
    );
  } else {
    return of(null);
  }
};
