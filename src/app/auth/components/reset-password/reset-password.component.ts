import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import AuthService from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isHide:boolean = true;
 private userEmail=localStorage.getItem("userEmail");

resetPasswordForm: FormGroup=new FormGroup({
  email:new FormControl(this.userEmail, Validators.required),
  password:new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]),
  confirmPassword:new FormControl('', Validators.required),
  seed:new FormControl('', Validators.required),

},{validators:this.checkPassword})
  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService ) {

  }
  sendData(data:FormGroup):void{
  this.authService.onResetPassword(data.value).subscribe({
    next: (res)=>{
      console.log(res);
      this.toastr.success(
        "Your password has been reset successfully. Redirecting to login...",
        "Success"
      );      this.router.navigate(['/auth']);
    },
    error: (err)=>{
      console.log(err);
      this.toastr.error(err.error.message, "Error") ;
    },
    complete: ()=>{

    }
  })
  }
  checkPassword(g:AbstractControl){
    const password=g.get('password')?.value;
    const confirmPassword=g.get('confirmPassword')?.value;

  return password === confirmPassword? null : {mismatch:true}
  }
}
