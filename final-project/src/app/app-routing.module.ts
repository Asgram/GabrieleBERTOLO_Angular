import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { LoginComponent } from './core/components/login/login.component';
import { NewsDetailComponent } from './core/components/news-detail/news-detail.component';
import { DashboardComponent } from './users/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'News Feed' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'articolo/:id', component: NewsDetailComponent, title: 'News Feed' },
  {
    path: 'user',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    component: DashboardComponent,
    title: 'User Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
