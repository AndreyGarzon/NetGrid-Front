import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User, UserResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get loggedUser(): User {
    return { ...this._user };
  }

  get roleUser() {
    return localStorage.getItem('role');
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    this.http.post(url, body);
    return this.http.post<AuthResponse>(url, body).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error.message))
    );
  }
  getLoggedInUser(auth_token: string) {
    localStorage.setItem('token', auth_token);
    const url = `${this.baseUrl}/auth/user-info`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return this.http.get<UserResponse>(url, { headers: headers }).pipe(
      tap((resp) => {
        this._user = resp.data;
      })
    );
  }
  tokenValidate(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/user-info`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<UserResponse>(url, { headers: headers }).pipe(
      map((resp) => {
        this._user = resp.data;
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    const url = `${this.baseUrl}/auth/logout`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    localStorage.clear();
    return this.http.get(url, { headers: headers });
  }


  register(data:User) {
    const url = `${this.baseUrl}/auth/register`;
    const body = data;
    this.http.post(url, body);
    return this.http.post<UserResponse>(url, body).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error))
    );
  }
}
