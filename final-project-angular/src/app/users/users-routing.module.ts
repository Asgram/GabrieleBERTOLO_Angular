import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNewsComponent } from './components/list-news/list-news.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { userResolver } from './resolvers/user.resolver';
import { newsResolver } from './resolvers/news.resolver';
import { noreaderGuard } from './guards/noreader.guard';
import { writerGuard } from './guards/writer.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivateChild: [noreaderGuard],
    children: [
      {
        path: 'mynews',
        component: ListNewsComponent,
        canActivate: [writerGuard],
      },
      {
        path: 'authusers',
        component: ListUsersComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: 'editnews',
    component: EditNewsComponent,
    resolve: { news: newsResolver },
  },
  {
    path: 'edituser',
    component: EditUserComponent,
    resolve: { user: userResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
