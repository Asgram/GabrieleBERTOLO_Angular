import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articolo } from '../../models/articolo';
import { take } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  news!: Articolo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.news = data['news'];
    });
  }
}
