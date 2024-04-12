import { Component } from '@angular/core';
import { NewsService } from '../../../core/services/news.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Articolo } from '../../../core/models/articolo';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.scss',
})
export class ListNewsComponent {
  news$!: Observable<Array<Articolo>>;
  destroy$: Subject<void> = new Subject<void>();

  news: Array<Articolo> = [];
  authUser!: User | null;

  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private nService: NewsService, private authService: AuthService) {
    this.userLogged$ = this.authService.userLogged$;
    this.userLogged$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.authUser = data ?? null;
    });

    this.news$ = this.nService.getNews();
    this.news$.pipe(takeUntil(this.destroy$)).subscribe((n) => {
      console.log(n);
      n.forEach((el) => {
        if (el.autore?.id === this.authUser?.id) this.news.push(el);
      });
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNews() {}
}
