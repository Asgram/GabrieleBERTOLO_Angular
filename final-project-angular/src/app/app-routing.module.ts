import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { LoginComponent } from './core/components/login/login.component';
import { NewsDetailComponent } from './core/components/news-detail/news-detail.component';
import { newsDetailResolver } from './core/resolvers/news-detail.resolver';

const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'News Feed' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'articolo',
    component: NewsDetailComponent,
    title: 'News Feed',
    resolve: { news: newsDetailResolver },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    title: 'User Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
