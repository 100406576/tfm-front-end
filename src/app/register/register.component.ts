import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User = new User();
  usernameExists = false;
  repeatPassword = '';

  constructor(
    private router: Router,
  ) { }

  checkUsername() {
    throw new Error('Method not implemented.');
  }

  isTheSamePassword(): boolean {
    if (this.newUser.password != this.repeatPassword) {
      return false;
    } else {
      return true;
    }
  }

  register(_t14: NgForm) {
    throw new Error('Method not implemented.');
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
