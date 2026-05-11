import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/auth/interfaces/auth';
import AuthService from 'src/app/auth/services/auth.service';

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
      navigationLink: '/dashboard/user-portal',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-receipt',
      navigationLink: '/dashboard/admin/recipes',
      isActive: this.isAdmin() || this.IsUser(),
    },
    {
      title: 'Categories',
      icon: 'fa-table-cells-large',
      navigationLink: '/dashboard/categories',
      isActive: this.isAdmin(),
    },
    {
      title: 'Favorites',
      icon: 'fa-heart',
      navigationLink: '/dashboard/favorites',
      isActive: this.IsUser(),
    },
    {
      title: 'Change Password',
      icon: 'fa-key',
      navigationLink: '/dashboard/change-password',
      isActive: this.IsUser() || this.isAdmin(),
    },
  ];
  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
  ) {}
  onLogOut() {
    this._authService.logout();
    this.toastr.success('You have been logged out successfully.');
  }
}
