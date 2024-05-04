import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../shared/models/propery.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ReadPropertyDetailDialogComponent } from './read-property-detail/read-property-detail.component';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  properties!: Observable<Property[]>;

  constructor(private apiManager: ApiRestManagerService,
    private dialog: MatDialog
  ) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = this.apiManager.getUserProperties();
  }

  onDelete(_t54: any) {
    alert('Method not implemented.');
  }

  onEdit(_t54: any) {
    alert('Method not implemented.');
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
    alert('Method not implemented.');
  }
}
