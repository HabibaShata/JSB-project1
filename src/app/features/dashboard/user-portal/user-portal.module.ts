import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { RecipesComponent } from './components/recipe-list/recipes.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [UserPortalComponent,RecipesComponent,ViewRecipeComponent, FavoriteListComponent],
  imports: [
    CommonModule, UserPortalRoutingModule,
    MatProgressSpinnerModule, FormsModule, NgOptimizedImage, ReactiveFormsModule,
    SharedModule
]
})
export class UserPortalModule {}
