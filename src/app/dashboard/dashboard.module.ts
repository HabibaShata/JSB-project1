import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { NavComponent } from '../shared/nav/nav.component';

@NgModule({
  declarations: [DashboardComponent, SideBarComponent, NavComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
