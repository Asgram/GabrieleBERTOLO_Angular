import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, EditNewsComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
