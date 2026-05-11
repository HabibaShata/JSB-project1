import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AuthService from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent {
  verificationForm=new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    code:new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) {
  }
  sendData(data:FormGroup){
  this.authService.onVerifyUser(data.value).subscribe({
    next: (res)=>{
      console.log(res);
      this.toastr.success("You will be redirected to login now.",'Account verified successfully');
      this.router.navigate(['/auth']);
    },
    error: (err)=>{
      console.log(err);
      this.toastr.error(err.error.message, "Error Verifying User") ;
      },
    complete: ()=>{

    }

  })
  }
}
