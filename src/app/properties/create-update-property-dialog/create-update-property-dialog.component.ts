import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Flat, Garage, House, Property } from 'src/app/shared/models/property.model';
import { ApiRestManagerService } from 'src/app/shared/services/api-rest-manager.service';

@Component({
  selector: 'app-create-update-property',
  templateUrl: './create-update-property-dialog.component.html',
  styleUrls: ['./create-update-property-dialog.component.css']
})
export class CreateUpdatePropertyDialogComponent {
submit(_t7: NgForm) {
alert('Form submitted');
}
  title: string;
  property: Property;
  propertyType: 'house' | 'flat' | 'garage';
  oldPropertyId: string;
  houseDetails: House;
  flatDetails: Flat;
  garageDetails: Garage;

  constructor(@Inject(MAT_DIALOG_DATA) data: Property,
    private apiManager: ApiRestManagerService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
      this.title = data ? 'Editar propiedad' : 'Crear propiedad';
      this.oldPropertyId = data ? data.property_id : '';
      this.property = data ? data : new Property();
      this.houseDetails = data && data.houseDetails ? data.houseDetails : new House();
      this.flatDetails = data && data.flatDetails ? data.flatDetails : new Flat();
      this.garageDetails = data && data.garageDetails ? data.garageDetails : new Garage();
      this.propertyType = this.getDetailsType(this.property);
  }

  isCreate(): boolean {
    return this.oldPropertyId === '';
  }

  create(): void {
    this.setDetails();
    this.apiManager.createProperty(this.property).subscribe({
      next: (response) => {
        this.toastr.success('Propiedad cread correctamente', 'Creación', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.dialog.closeAll();
      },
      error: (error) => {
        this.toastr.error('No se ha podido crear la propiedad', 'Creación', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  update(): void {
    this.setDetails();
    this.apiManager.updateProperty(this.property.property_id, this.property).subscribe({
      next: (response) => {
        this.toastr.success('Propiedad actualizada correctamente', 'Actualización', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.dialog.closeAll();
      },
      error: (error) => {
        this.toastr.error('No se ha podido actualizar la propiedad', 'Actualización', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  private setDetails(): void {
    if (this.propertyType === 'house') {
      this.property.houseDetails = this.houseDetails;
    } else if (this.propertyType === 'flat') {
      this.property.flatDetails = this.flatDetails;
    } else {
      this.property.garageDetails = this.garageDetails;
    }
  }

  private getDetailsType(property: Property): 'house' | 'flat' | 'garage' {
    if (property.houseDetails) {
      return 'house';
    } else if (property.flatDetails) {
      return 'flat';
    } else if (property.garageDetails) {
      return 'garage';
    } else {
      return 'house';
    }
  }
}
