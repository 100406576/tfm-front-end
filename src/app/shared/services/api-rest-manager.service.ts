import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRestManagerService {
  private baseurl = 'http://localhost:3000/';

  constructor(private http: HttpClient,
    private auth: AuthService
  ) { }

  getUserProfile() {
    const username = this.auth.getCurrentUsername();
    const url = `${this.baseurl}users/${username}`;
    return this.http.get<User>(url).pipe(
      map((response: any) => {
        const user: User = {
          name: response.name,
          lastName: response.lastName,
          username: response.username,
          password: response.password,
          email: response.email,
          phoneNumber: response.phoneNumber,
          dni: response.dni,
          gender: response.gender
        };
        return user;
      })
    );
  }

  register(user: User) {
    const url = `${this.baseurl}users`;
    const body = user;
    return this.http.post(url, body, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  login(credentials: { username: string, password: string }) {
    const url = `${this.baseurl}users/login?username=${credentials.username}&password=${credentials.password}`;
    return this.http.get(url, { observe: 'response' });
  }
}
