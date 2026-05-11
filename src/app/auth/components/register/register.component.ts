import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import AuthService from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 isHide:boolean = true;
 registerForm: FormGroup=new FormGroup({
   userName:new FormControl('',[Validators.required,Validators.maxLength(8),Validators.pattern(/^[A-Za-z]+[0-9]+$/)]),
   email:new FormControl('', Validators.required),
   password:new FormControl('',[ Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]),
   confirmPassword:new FormControl('', [Validators.required]),
   country:new FormControl('', Validators.required),
   profileImage:new FormControl(''),
   phoneNumber:new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
 })

  files: File[] = [];

  onSelect(e: any) {
    this.files.push(...e.addedFiles);
  }


  onRemove(e: any) {
    console.log(e);
    this.files.splice(this.files.indexOf(e), 1);
  }

  constructor(private authService: AuthService, private toastr:ToastrService,private router: Router) { }


  sendData(data:FormGroup){

  let newFormData=new FormData();
    Object.entries(this.registerForm.getRawValue()).forEach(([key,value]) => {
     if (value!==null && key!=="profileImage") {
       newFormData.append(key,value as string);
     }
    })
   newFormData.append("profileImage",this.files[0]);

    this.authService.register(newFormData).subscribe({
      next: ( res)=> {
        this.toastr.success("Registration successful. Please check your email to verify your account.");
        this.router.navigateByUrl("/auth/verify-user");
      },
      error:(err)=> {
        console.log(err)
        this.toastr.error(err.error.message, "Register failed") ;
      },
      complete:()=> {
      }
    })
  }

}
