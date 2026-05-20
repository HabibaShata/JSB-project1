import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
 isLoading: boolean = false;
 isHiden: boolean = false;
  editForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    imagePath: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    
  });

  sendData(formData: FormGroup): void {
this.isLoading = true;
this.isHiden = true;
}

}

// {
//   "id": 1879,
//   "userName": "habiba1",
//   "email": "habiba0helmy@gmail.com",
//   "country": "egypt",
//   "phoneNumber": "01262772623",
//   "imagePath": null,
//   "group": {
//     "id": 2,
//     "name": "SystemUser",
//     "creationDate": "2024-02-10T11:15:00.393Z",
//     "modificationDate": "2024-02-10T11:15:00.393Z"
//   },
//   "creationDate": "2025-02-15T13:09:01.723Z",
//   "modificationDate": "2026-05-18T18:24:38.814Z"
// }
