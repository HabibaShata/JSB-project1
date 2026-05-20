import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RecipesModule } from './recipes/recipes.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, RecipesModule],
  exports: [ RecipesModule]
})
export class AdminModule {}
