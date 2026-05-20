import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';

const routes: Routes = [
  { path: '', component: ViewRecipesComponent },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-recipe/add-edit-recipe.component').then(
        (m) => m.AddEditRecipeComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/add-edit-recipe/add-edit-recipe.component').then(
        (m) => m.AddEditRecipeComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
