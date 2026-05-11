import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AuthService from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 isHide:boolean = true;
loginForm: FormGroup=new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required])
});

constructor(private authService: AuthService, private toastr:ToastrService) {
}


  sendData(data:FormGroup){
   this.authService.login(data.value).subscribe({
  next: (res) => {
    console.log(res);
  },
  error: error => {
    console.log(error);
    this.toastr.error(error.error.message, 'Login failed!');

  },
  complete: () => {
    this.toastr.success('Welcome back!', 'Login successfully.!');

  },
});

  }

}
