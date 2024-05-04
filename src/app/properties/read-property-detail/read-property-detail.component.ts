import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-read-detail',
  templateUrl: './read-property-detail.component.html',
  styleUrls: ['./read-property-detail.component.css']
})

export class ReadPropertyDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  keyMap: { [key: string]: string } = {
    'propertyName': 'Nombre de la propiedad',
    'address': 'Dirección',
    'cadastralReference': 'Referencia catastral',
    'numberOfRooms': 'Número de habitaciones',
    'floorNumber': 'Número de piso',
    'hasBalcony': 'Tiene balcón',
    'hasGarden': 'Tiene jardín',
    'capacity': 'Capacidad',
    'isPrivate': 'Es privado',
    'flatDetails': 'Detalles del piso',
    'houseDetails': 'Detalles de la casa',
    'garageDetails': 'Detalles del garaje'
  };

  labels(data: any): string[] {
    const excludeKeys = ['property_id', 'user_id', 'createdAt', 'updatedAt', 'id', 'flatDetails', 'houseDetails', 'garageDetails'];
    return Object.keys(data).filter(key => !excludeKeys.includes(key));
  }

  getDetailsType(data: any): string {
    if (data.flatDetails) {
      return 'flatDetails';
    } else if (data.houseDetails) {
      return 'houseDetails';
    } else if (data.garageDetails) {
      return 'garageDetails';
    }
    return '';
  }
}
