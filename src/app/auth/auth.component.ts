import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AuthService from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isHide: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      ),
    ]),
  });
  userToken: string = '';
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  sendData(data: FormGroup) {
    this.authService.login(data.value).subscribe({
      next: (res: unknown) => {
        this.toastr.success('Welcome back!', 'Login successfully.!');
        const token = (res as { token: string }).token;
        localStorage.setItem('token', token);
        this.authService.getProfile();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Login failed!');
      },
      complete: () => {
        this.router.navigateByUrl('/dashboard');
      },
    });
  }
}
