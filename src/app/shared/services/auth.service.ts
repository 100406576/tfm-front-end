import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  getCurrentUsername(): string | null {
    return sessionStorage.getItem('currentUsername');
  }

  setCurrentUsername(username: string): void {
    sessionStorage.setItem('currentUsername', username);
  }

  setToken(jwtToken: string): void {
    sessionStorage.setItem('jwtToken', jwtToken);
    this.changeAuthStatus(true);
  }

  removeSession() {
    sessionStorage.removeItem('currentUsername');
    sessionStorage.removeItem('jwtToken');
    this.changeAuthStatus(false);
  }

  hasToken(): boolean {
    if (sessionStorage.getItem('jwtToken') != null) {
      return true;
    }
    return false;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  private changeAuthStatus(value: boolean) {
    this.authStatus.next(value);
  }
}
