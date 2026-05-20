import { IUser } from './../../interfaces/ishared';
import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  userName: string = localStorage.getItem('userName') || 'User';
  currentUser!: IUser;
  constructor(private _SharedService: SharedService, private _MatDialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserProfile();

    console.log(this.currentUser.imagePath);
  }
  getUserProfile() {
    this._SharedService.onGetCurrentUser().subscribe({
      next: (data: IUser) => {
        this.currentUser = data;
      },
    });
  }

  get userImage() {
    return this.currentUser?.imagePath
      ? 'https://upskilling-egypt.com:3006/' + this.currentUser.imagePath
      : 'assets/images/replacement.png';
  }
  editProfile() {
  this._MatDialog.open(EditProfileComponent, {
    width: '400px',
  });
}
  
}
