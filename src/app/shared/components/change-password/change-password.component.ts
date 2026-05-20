import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {DialogRef} from "@angular/cdk/dialog";
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isLoading: boolean = false;
  changePasswordForm: FormGroup=new FormGroup({
    oldPassword:new FormControl('', [Validators.required]),
    newPassword:new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]),
    confirmNewPassword:new FormControl('', Validators.required),

  },{validators:this.checkPassword});

  constructor(private _SharedService: SharedService, private router: Router,private toastr: ToastrService ,private _DialogRef:DialogRef,) {

  }
  isHide:boolean = true;

  sendData(data:FormGroup):void{
    this.isLoading=true;
    this._SharedService.onChangePassword(data.value).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastr.success(
          "Password updated successfully.",
          "Success"
        );
        // this.router.navigate(['/auth']);
      },
      error: (err)=>{
        console.log(err);
        this.isLoading=false;
        this.toastr.error(err.error.message, "Error") ;
      },
      complete: ()=>{
        this.isLoading=false;
         this._DialogRef.close();
      }
    })
  }
  checkPassword(g:AbstractControl){
    const password=g.get('newPassword')?.value;
    const confirmPassword=g.get('confirmNewPassword')?.value;

    return password === confirmPassword? null : {mismatch:true}
  }

}
