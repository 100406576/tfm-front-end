import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../shared/models/propery.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  properties!: Observable<Property[]>;

  constructor(private dialog: MatDialog) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = of([
      {
          property_id: "76036352-7bc6-4fc8-992b-eec56734b150",
          propertyName: "Casa de la montaña",
          address: "Calle de la montaña, 5, Bajo A",
          cadastralReference: "1234567890",
          user_id: "6c28dd7d-f8d6-4f61-ac4c-ed6346ee2f8a",
          createdAt: "2024-04-25T09:43:35.000Z",
          updatedAt: "2024-04-25T09:43:35.000Z",
          houseDetails: {
              id: 12,
              numberOfRooms: 3,
              hasGarden: true,
              createdAt: "2024-04-25T09:43:35.000Z",
              updatedAt: "2024-04-25T09:43:35.000Z",
              property_id: "76036352-7bc6-4fc8-992b-eec56734b150"
          }
      },
      {
          property_id: "8a110e22-8512-4a0e-87c5-80bda77a3a65",
          propertyName: "Casa de la montaña",
          address: "Calle de la montaña, 5, Bajo A",
          cadastralReference: "1234567890",
          user_id: "6c28dd7d-f8d6-4f61-ac4c-ed6346ee2f8a",
          createdAt: "2024-04-25T10:02:00.000Z",
          updatedAt: "2024-04-25T10:02:00.000Z",
          flatDetails: {
              id: 2,
              numberOfRooms: 3,
              floorNumber: 2,
              hasBalcony: true,
              createdAt: "2024-04-25T10:02:00.000Z",
              updatedAt: "2024-04-25T10:02:00.000Z",
              property_id: "8a110e22-8512-4a0e-87c5-80bda77a3a65"
          }
      },
      {
        property_id: "76036352-7bc6-4fc8-992b-eec56734b150",
        propertyName: "Casa de la montaña",
        address: "Calle de la montaña, 5, Bajo A",
        cadastralReference: "1234567890",
        user_id: "6c28dd7d-f8d6-4f61-ac4c-ed6346ee2f8a",
        createdAt: "2024-04-25T09:43:35.000Z",
        updatedAt: "2024-04-25T09:43:35.000Z",
        houseDetails: {
            id: 12,
            numberOfRooms: 3,
            hasGarden: true,
            createdAt: "2024-04-25T09:43:35.000Z",
            updatedAt: "2024-04-25T09:43:35.000Z",
            property_id: "76036352-7bc6-4fc8-992b-eec56734b150"
        }
    },
    {
        property_id: "8a110e22-8512-4a0e-87c5-80bda77a3a65",
        propertyName: "Casa de la montaña",
        address: "Calle de la montaña, 5, Bajo A",
        cadastralReference: "1234567890",
        user_id: "6c28dd7d-f8d6-4f61-ac4c-ed6346ee2f8a",
        createdAt: "2024-04-25T10:02:00.000Z",
        updatedAt: "2024-04-25T10:02:00.000Z",
        flatDetails: {
            id: 2,
            numberOfRooms: 3,
            floorNumber: 2,
            hasBalcony: true,
            createdAt: "2024-04-25T10:02:00.000Z",
            updatedAt: "2024-04-25T10:02:00.000Z",
            property_id: "8a110e22-8512-4a0e-87c5-80bda77a3a65"
        }
    }
  ]);
  }

  onDelete(_t54: any) {
    alert('Method not implemented.');
  }

  onEdit(_t54: any) {
    alert('Method not implemented.');
  }
  
  onRead(property: any) {
    alert('Method not implemented.');
  }

  onCreate() {
    alert('Method not implemented.');
  }
}
