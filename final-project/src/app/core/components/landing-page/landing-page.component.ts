import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Articolo } from '../../models/articolo';
import { NewsService } from '../../services/news.service';
import { Router } from 'express';
import { NewsCardComponent } from '../news-card/news-card.component';

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

  constructor(input: NewsCardInput, component?: any) {
    if (component) this.component = component;
    this.inputs = { cardInput: input };
    //this.inputs.input = input;
  }
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  news$!: Observable<Array<Articolo>>;
  newsFeed!: Array<NewsCard>;

  constructor(private nService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadNewsFeed();
  }

  loadNewsFeed() {
    this.news$ = this.nService.getNews();
  }

  setCardInputs(news: Articolo) {
    this.newsFeed.push(
      new NewsCard(
        new NewsCardInput(
          news.titolo,
          news.testo,
          news.dataModifica ? news.dataModifica : news.dataCreazione
        ),
        NewsCardComponent
      )
    );
  }
}
