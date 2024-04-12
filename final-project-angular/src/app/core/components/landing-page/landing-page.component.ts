import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Articolo } from '../../models/articolo';
import { NewsService } from '../../services/news.service';
import { NewsCardComponent } from '../news-card/news-card.component';
import { Router } from '@angular/router';

export class NewsCardInput {
  title: string;
  content: string;
  date: Date | string;

  constructor(title: string, content: string, date: Date | string) {
    this.title = title;
    this.content = content;
    this.date = date;
  }
}

class NewsCard {
  component: any;
  inputs: { cardInput: NewsCardInput };
  newsID: string | number;
  categoria: string;

  constructor(
    input: NewsCardInput,
    newsID: string | number,
    categoria: string,
    component?: any
  ) {
    if (component) this.component = component;
    this.inputs = { cardInput: input };
    this.newsID = newsID;
    this.categoria = categoria;
    //this.inputs.input = input;
  }
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  news$!: Observable<Array<Articolo>>;
  destroy$: Subject<void> = new Subject<void>();

  newsFeed: Array<NewsCard> = [];
  newsTabs: Array<string> = [];
  news: Array<Articolo> = [];

  categoriaSelezionata: string = '';

  constructor(private nService: NewsService, private router: Router) {
    this.news$ = this.nService.getNews();
    this.news$.pipe(takeUntil(this.destroy$)).subscribe((n) => {
      console.log(n);
      this.news = n;
      this.news.forEach((el) => {
        if (!this.newsTabs.includes(el.categoria)) {
          console.log(el.categoria);
          this.newsTabs.push(el.categoria);
        }
        this.setCardInputs(el);
      });
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    //this.loadNewsFeed();
  }

  // loadNewsFeed() {
  //   this.news$ = this.nService.getNews();
  //   this.news$.pipe(takeUntil(this.destroy$)).subscribe((n) => {
  //     console.log(n);
  //     this.news = n;
  //     this.news.forEach((el) => {
  //       if (!this.newsTabs.includes(el.categoria)) {
  //         console.log(el.categoria);
  //         this.newsTabs.push(el.categoria);
  //       }
  //       this.setCardInputs(el);
  //     });
  //   });
  // }

  //loadNewsTabs() {}

  setCardInputs(news: Articolo) {
    let newCard = new NewsCard(
      new NewsCardInput(
        news.titolo,
        news.testo,
        news.dataModifica ? news.dataModifica : news.dataCreazione
      ),
      news.id ?? '',
      news.categoria,
      NewsCardComponent
    );
    console.log(newCard);
    this.newsFeed.push(newCard);
  }

  setCategory(categoria: string) {
    if (this.categoriaSelezionata !== categoria)
      this.categoriaSelezionata = categoria;
    else this.categoriaSelezionata = '';
  }

  goToNewsDetail(newsID: string | number) {
    this.router.navigate(['articolo'], {
      queryParams: { newsID: newsID },
    });
  }
}
