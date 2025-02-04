import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User, UserLogin, UserTable} from '../interfaces/interfaces';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly myAppUrl: string;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.myAppUrl = environment.back_url;
  }

  async getUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      "Content-Type": "application/json",
    });
    return await this.http.get<any>(`${this.myAppUrl}/users`, {headers: headers}).toPromise();
  }

  async updateUsers(id: number, user: UserTable) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });

    return await this.http.put<any>(`${this.myAppUrl}/users/${id}`,  user, { headers }).toPromise();
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}/register`, user);
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post(`${this.myAppUrl}/login`, user);
  }

  setToken(token: string, expires_in : any) {

    this.cookieService.set('authToken', token, {
      expires: expires_in, // Expira en 1 día
      secure: false, // Solo se enviará en HTTPS
      sameSite: 'Strict', // Evita ataques CSRF
    });
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  deleteToken() {
    this.cookieService.delete('authToken', '/');
  }
}

