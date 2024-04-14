import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private apiRestManager: ApiRestManagerService,
    private auth: AuthService,
    private toastr: ToastrService
  ){}

  login(loginForm: NgForm) {
    if(loginForm.invalid) {
      return;
    }
    this.apiRestManager.login(this.credentials).subscribe({
      next: (response: HttpResponse<any>) => {
        this.auth.setToken(response.headers.get('Authorization')!);
        this.toastr.success('Login existoso', 'Login', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
          let errorMsg = '';
          switch (error.status) {
              case 400:
                  errorMsg = "Usuario o contraseña no definido";
                  break;
              case 401:
                  errorMsg = "Usuario o contraseña incorrecto";
                  break;
              default:
                  errorMsg = "Internal server error";
                  break;
        }
        this.toastr.error(errorMsg, 'Login error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });    
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}