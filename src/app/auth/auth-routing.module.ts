import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VerifyUserComponent} from "./components/verify-user/verify-user.component";
import {RequestResetPasswordComponent} from "./components/request-reset-password/request-reset-password.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'verify-user', component:VerifyUserComponent },
  { path: 'request-reset-password', component:RequestResetPasswordComponent },
  { path: 'reset-password', component:ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
