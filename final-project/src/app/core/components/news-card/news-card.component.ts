import { Component, Input } from '@angular/core';
import { NewsCardInput } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-news-card',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ cardInput.title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        {{
          cardInput.content.length > 20
            ? (cardInput.content | slice : 0 : 20) + '[...]'
            : cardInput.content
        }}
      </mat-card-content>
      <mat-card-footer>
        {{ cardInput.date }}
      </mat-card-footer>
    </mat-card>
  `,
  //styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input() cardInput!: NewsCardInput;
}
