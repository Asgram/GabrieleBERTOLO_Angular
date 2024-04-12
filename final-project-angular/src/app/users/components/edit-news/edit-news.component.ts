import { Component } from '@angular/core';
import { Articolo } from '../../../core/models/articolo';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.scss',
})
export class EditNewsComponent {
  news!: Articolo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.news = data['news'];
    });
  }
}
