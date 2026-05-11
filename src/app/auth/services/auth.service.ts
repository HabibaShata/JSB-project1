import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ILogin } from '../interfaces/auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
class AuthService {
  constructor(private _http: HttpClient) {}

  // ====== login =======
  login(userData: ILogin): Observable<unknown> {
    return this._http.post(`Users/Login`, userData);
  }
  // ====== register =======
  register(userData: FormData): Observable<unknown> {
    return this._http.post(`Users/Register`, userData);
  }
  // ====== verify account =======
  onVerifyUser(userData: FormGroup): Observable<unknown> {
    return this._http.post(`Users/verify`, userData);
  }
  // ====== Request reset pass =======
  onRequestResetPassword(userData: FormGroup): Observable<unknown> {
    return this._http.post(`Users/Reset/Request`, userData);
  }
  // ======  reset Password =======
  onResetPassword(userData: FormGroup): Observable<unknown> {
    return this._http.post(`Users/Reset`, userData);
  }
  // ======  getProfile =======
  getProfile() {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const role = (decoded as { userGroup: string }).userGroup;
      localStorage.setItem('role', role);
      localStorage.setItem(
        'userName',
        decoded ? (decoded as { userName: string }).userName : '',
      );
    }
  }
  // ======  logout =======
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
  }
}

export default AuthService;
