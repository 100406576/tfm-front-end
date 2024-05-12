import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../shared/models/property.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ReadPropertyDetailDialogComponent } from './read-property-detail-dialog/read-property-detail-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdatePropertyDialogComponent } from './create-update-property-dialog/create-update-property-dialog.component';
import { GoogleMap } from '@angular/google-maps';
import { GeocodingService } from '../shared/services/geocoding.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  properties!: Observable<Property[]>;
  markers: {
    position: {
      lat: number;
      lng: number;
    };
  }[] = [];


  @ViewChild(GoogleMap) map!: GoogleMap;

  ngAfterViewInit() {
    this.fitMapBounds();
  }

  constructor(private apiManager: ApiRestManagerService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private geocodingService: GeocodingService) {
    this.loadProperties();
  };

  loadProperties(): void {
    this.properties = this.apiManager.getUserProperties();
    this.properties.subscribe(properties => {
      this.loadMarkers(properties);
    });
  }

  loadMarkers(properties: Property[]): void {
    this.markers = [];
    properties.forEach(property => {
      this.geocodingService.getLocation(property.address).subscribe(response => {
        if (response.status === 'OK' && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
          const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
          //console.log(`Latitud: ${lat}, Longitud: ${lng}`);
          const newMarker = { position: { lat: lat as number, lng: lng as number } };
          this.markers.push(newMarker);
          this.fitMapBounds();
        } else {
          console.error('No se pudo obtener la ubicación para la dirección proporcionada.');
        }
      });
    });
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

  fitMapBounds() {
    const bounds = this.getBounds(this.markers);
    if (this.map?.googleMap) {
      this.map.googleMap.fitBounds(bounds);
    }
  }

  getBounds(markers: any) {
    let north;
    let south;
    let east;
    let west;

    for (const marker of markers) {
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    };

    const bounds = { north, south, east, west };

    return bounds;
  }
}
