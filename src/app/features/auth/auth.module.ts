import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    VerifyUserComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxDropzoneModule,
      MatProgressSpinnerModule
    ]
})
export class AuthModule { }
