import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRestManagerService {
  private baseurl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  existUsername(username: string) {
    const url = `${this.baseurl}users/${username}`;
    return this.http.get(url, { observe: 'response' });
  }

  register(user: User) {
    const url = `${this.baseurl}users`;
    const body = user;
    return this.http.post(url, body, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }
}
