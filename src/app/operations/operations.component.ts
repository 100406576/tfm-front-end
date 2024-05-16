import { Component } from '@angular/core';
import { Property } from '../shared/models/property.model';
import { Operation } from '../shared/models/opetation.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})

export class OperationsComponent {
  properties!: Property[];
  selectedProperty_id: string = '';
  operations!: Operation[];

  constructor(private apiManager: ApiRestManagerService) {}

  ngOnInit() {
    this.apiManager.getUserProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  onPropertyChange(property_id: string) {
    this.apiManager.getPropertyOperations(property_id).subscribe((operations) => {
      this.operations = operations;
    });
  }

  onAddIncome() {
    alert('Method not implemented.');
  }
  
  onAddExpense() {
    alert('Method not implemented.');
  }

  onDeleteOperation(_t129: any) {
    alert('Method not implemented.');
  }
  
  onEditOperation(_t129: any) {
    alert('Method not implemented.');
  }
}
