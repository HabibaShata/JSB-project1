import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPortalComponent } from './user-portal.component';

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    children: [
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
      {
        path: 'recipes',
        loadComponent: () =>
          import('./components/recipes/recipes.component').then(
            (m) => m.RecipesComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPortalRoutingModule {}
