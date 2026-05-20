import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/gurds/admin.guard';
import { userPortalGuard } from '../../core/gurds/user-portal.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../../shared/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user-portal',
        canActivate: [userPortalGuard],
        loadChildren: () =>
          import('./user-portal/user-portal.module').then(
            (m) => m.UserPortalModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
