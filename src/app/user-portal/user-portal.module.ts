import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { RecipesComponent } from './components/recipes/recipes.component';

@NgModule({
  declarations: [UserPortalComponent],
  imports: [CommonModule, UserPortalRoutingModule, RecipesComponent],
})
export class UserPortalModule {}
