import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Operation } from '../../shared/models/operation.model';
import { ApiRestManagerService } from '../../shared/services/api-rest-manager.service';

@Component({
  selector: 'app-create-update-operation-dialog',
  templateUrl: './create-update-operation-dialog.component.html',
  styleUrls: ['./create-update-operation-dialog.component.css']
})
export class CreateUpdateOperationDialogComponent {
  title: string;
  operation: Operation;
  oldOperationId: string;
  date!: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    private apiManager: ApiRestManagerService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
      if (data.operation) {
        this.title = 'Editar operación';
        this.oldOperationId = data.operation.operation_id;
        this.operation = data.operation;
        if (this.operation.date) {
          const date = new Date(this.operation.date);
          this.date = this.formatDate(date);
        }
      } else {
        this.title = 'Crear operación';
        this.oldOperationId = '';
        this.operation = new Operation();
        this.operation.property_id = data.selectedProperty_id;
        if (data.isExpense) {
          this.operation.type = 'expense';
        }
      }
  }

  isCreate(): boolean {
    return this.oldOperationId === '';
  }

  create(): void {
    this.operation.date = new Date(this.date);
    this.apiManager.createOperation(this.operation).subscribe({
      next: (response) => {
        this.toastr.success('Operación creada correctamente', 'Creación', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.dialog.closeAll();
      },
      error: (error) => {
        this.toastr.error('No se ha podido crear la operación', 'Creación', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  update(): void {
    alert('Method not implemented.');
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}