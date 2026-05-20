import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPortalComponent } from './user-portal.component';
import {RecipesComponent} from "./components/recipe-list/recipes.component";
import {FavoriteListComponent} from "./components/favorite-list/favorite-list.component";

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    children: [
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
      {
        path: 'recipes',component:RecipesComponent
      },
      {path:'favorites',component:FavoriteListComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPortalRoutingModule {}
