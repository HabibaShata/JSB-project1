import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [RecipesComponent, ViewRecipesComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    AddEditRecipeComponent,
    NgxDropzoneModule,
  ],
})
export class RecipesModule {}
