import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AuthService from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {

 requestResetPasswordForm: FormGroup=new  FormGroup({
   email:new FormControl('', [Validators.required, Validators.email]),
 })

  constructor(private Auth: AuthService, private router: Router, private auth: AuthService, private toastr: ToastrService) { }
  sendData(data:FormGroup){
 this.Auth.onRequestResetPassword(data.value).subscribe({
   next:(res)=>{

   },
   error:(err)=>{
     this.toastr.error(err.error.message) ;

   },
   complete:()=>{
     this.toastr.success("Your request is being processed, please check your email");
     this.router.navigate(['/auth/reset-password']);
     localStorage.setItem("userEmail",data.value.email);
   }
 })
  }
}
