import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../shared/models/property.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ReadPropertyDetailDialogComponent } from './read-property-detail-dialog/read-property-detail-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdatePropertyDialogComponent } from './create-update-property-dialog/create-update-property-dialog.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  properties!: Observable<Property[]>;

  constructor(private apiManager: ApiRestManagerService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = this.apiManager.getUserProperties();
  }
  
  onRead(property: any) {
    this.apiManager.getProperty(property.property_id).subscribe((property) => {
      this.dialog.open(ReadPropertyDetailDialogComponent, {
        data: {
          object: property
        }
      });
    });
  }

  onCreate() {
    this.dialog.open(CreateUpdatePropertyDialogComponent).afterClosed().subscribe(() => {
      this.loadProperties();
    });
  }

  onEdit(property: any) {
    this.dialog.open(CreateUpdatePropertyDialogComponent, {
      data: property
    }).afterClosed().subscribe(() => {
      this.loadProperties();
    });
  }

  onDelete(property: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Borrar propiedad', message: '¿Estás seguro de que deseas eliminar esta propiedad?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiManager.deleteProperty(property.property_id).subscribe({
          next: (response) => {
            this.loadProperties();
            this.toastr.success('Propiedad borrada correctamente', 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (error) => {
            this.toastr.error('No se ha podido borrar la propiedad', 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    });
  }
}
