import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListNewsComponent } from './components/list-news/list-news.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MaterialModule } from '../core/material/material.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EditNewsComponent,
    ListNewsComponent,
    ListUsersComponent,
    EditUserComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
