import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {AddEditUserComponent} from "./components/add-edit-user/add-edit-user.component";
import {NgxDropzoneModule} from "ngx-dropzone";
import {ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class UsersModule { }
