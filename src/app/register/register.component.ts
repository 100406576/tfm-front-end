import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { NgForm } from '@angular/forms';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User = new User();
  repeatPassword = '';

  constructor(
    private router: Router,
    private apiRestManager: ApiRestManagerService,
    private toastr: ToastrService
  ) { }

  isTheSamePassword(): boolean {
    if (this.newUser.password != this.repeatPassword) {
      return false;
    } else {
      return true;
    }
  }

  register(registerForm: NgForm): void {
    if (registerForm.invalid || !this.isTheSamePassword()) {
      return;
    }
    this.apiRestManager.register(this.newUser).subscribe({
      next: (response: HttpResponse<any>) => {
        this.toastr.success('¡Cuenta creada con éxito!', 'Registro', {
          timeOut: 4000,
          positionClass: 'toast-bottom-right',
        });
        this.redirectToLogin();
      },
      error: (error) => {
        let errorMsg = '';
        switch (error.status) {
          case 400:
            errorMsg = "Revisa los datos";
            break;
          case 409:
            errorMsg = "El nombre de usuario ya existe";
            break;
          default:
            errorMsg = "Internal server error";
            break;
        }
        this.toastr.error(errorMsg, 'Error en el registro', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
