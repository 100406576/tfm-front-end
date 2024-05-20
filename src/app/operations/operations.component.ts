import { Component } from '@angular/core';
import { Property } from '../shared/models/property.model';
import { Operation } from '../shared/models/operation.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateOperationDialogComponent } from './create-update-operation-dialog/create-update-operation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent {
  properties!: Property[];
  selectedProperty_id: string = '';
  operations!: Operation[];

  constructor(public apiManager: ApiRestManagerService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiManager.getUserProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  onPropertyChange(property_id: string) {
    this.apiManager.getPropertyOperations(property_id).subscribe((operations) => {
      this.operations = operations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  onAddIncome() {
    this.createOperation(false);
  }

  onAddExpense() {
    this.createOperation(true);
  }
  
  createOperation(isExpense: boolean) {
    this.dialog.open(CreateUpdateOperationDialogComponent, {
      data: {
        selectedProperty_id: this.selectedProperty_id,
        isExpense: isExpense
      }
    }).afterClosed().subscribe(() => {
      this.onPropertyChange(this.selectedProperty_id);
    });
  }
  
  onEditOperation(operation: Operation) {
    this.dialog.open(CreateUpdateOperationDialogComponent, {
      data: {
        operation: operation
      }
    }).afterClosed().subscribe(() => {
      this.onPropertyChange(this.selectedProperty_id);
    });
  }

  onDeleteOperation(operation: Operation) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Borrar operación', message: '¿Estás seguro de que deseas eliminar esta operación?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && operation.operation_id) {
        this.apiManager.deleteOperation(operation.operation_id).subscribe({
          next: (response) => {
            this.onPropertyChange(this.selectedProperty_id);
            this.toastr.success('Operación borrada correctamente', 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (error) => {
            this.toastr.error('No se ha podido borrar la operación', 'Borrado', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    });
  }
}
