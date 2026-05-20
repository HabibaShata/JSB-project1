import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/features/auth/interfaces/auth';
import AuthService from 'src/app/features/auth/services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";


interface IMenue {
  title: string;
  icon: string;
  navigationLink: string;
  isActive: boolean;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  isAdmin(): boolean {
    return localStorage.getItem('role') === UserRole.SuperAdmin;
  }
  IsUser(): boolean {
    return localStorage.getItem('role') === UserRole.SystemUser;
  }
  ngOnInit() {
    console.log(this.IsUser());
  }

  menu: IMenue[] = [
    {
      title: 'Home',
      icon: 'fa-home',
      navigationLink: '/dashboard/home',
      isActive: this.isAdmin() || this.IsUser(),
    },
    {
      title: 'Users',
      icon: 'fa-user-group',
      navigationLink: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-receipt',
      navigationLink:this.IsUser() ? '/dashboard/user-portal/recipes':'/dashboard/admin/recipes',
      isActive: this.isAdmin() || this.IsUser(),
    },
    {
      title: 'Categories',
      icon: 'fa-table-cells-large',
      navigationLink: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      title: 'Favorites',
      icon: 'fa-heart',
      navigationLink: '/dashboard/user-portal/favorites',
      isActive: this.IsUser(),
    },
  ];
  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    private _MatDialog:MatDialog
  ) {}
  onLogOut() {
    this._authService.logout();
    this.toastr.success('You have been logged out successfully.');
  }
  goToChangePassword(){
   this._MatDialog.open(ChangePasswordComponent, {
     data: { title: 'Change Password' },

   })
  }
}
