import { Component, OnInit } from '@angular/core';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { User } from '../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = new User();
  isEditing: boolean = false;

  constructor(private apiManager: ApiRestManagerService,
    private auth: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.apiManager.getUserProfile().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  onEditClicked() {
    this.isEditing = true;
  }

  onSaveEditClicked() {
    this.apiManager.updateUser(this.user).subscribe({
      next: (response) => {
        this.toastr.success('Usuario editado correctamente', 'Editado', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.isEditing = false;
        this.loadUserData();
      },
      error: (error) => {
        let errorMsg = '';
        switch (error.status) {
          case 404:
            errorMsg = "El usuario que intentas editar no existe";
            break;
          default:
            errorMsg = "No se ha podido editar el usuario";
            break;
        }
        this.toastr.error(errorMsg, 'Editado', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  onCancelEditClicked() {
    this.isEditing = false;
    this.loadUserData();
  }

  onDeletedClicked() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Borrar usuario', message: '¿Estás seguro de que deseas eliminar tu cuenta?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiManager.deleteUser().subscribe({
          next: (response) => {
            this.auth.removeSession();
            this.toastr.success('Usuario borrado correctamente', 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            let errorMsg = '';
            switch (error.status) {
              case 404:
                errorMsg = "El usuario que intentas eliminar no existe";
                break;
              default:
                errorMsg = "No se ha podido borrar el usuario";
                break;
            }
            this.toastr.error(errorMsg, 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    });
  }
}