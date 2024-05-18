import { Component } from '@angular/core';
import { Property } from '../shared/models/property.model';
import { Operation } from '../shared/models/operation.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateOperationDialogComponent } from './create-update-operation-dialog/create-update-operation-dialog.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent {
  properties!: Property[];
  selectedProperty_id: string = '';
  operations!: Operation[];

  constructor(private apiManager: ApiRestManagerService,
    private dialog: MatDialog,
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

  onDeleteOperation(_t129: any) {
    alert('Method not implemented.');
  }
}
