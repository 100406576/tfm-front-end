import { Component } from '@angular/core';
import { Property } from '../shared/models/property.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ToastrService } from 'ngx-toastr';
import { TaxReturn } from '../shared/models/tax-return.model';

@Component({
  selector: 'app-tax-return',
  templateUrl: './tax-return.component.html',
  styleUrls: ['./tax-return.component.css']
})
export class TaxReturnComponent {

  properties!: Property[];
  selectedProperty_id: string = '';
  selectedProperty: Property = {} as Property;
  fiscalYear!: number;
  numberOfDaysRented!: number;
  previousYearsImprovements: number | undefined;
  currentYearImprovements: number | undefined;
  taxReturn: TaxReturn = {} as TaxReturn;
  isTaxReturnGenerated: boolean = false;

  constructor(public apiManager: ApiRestManagerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiManager.getUserProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  onPropertyChange(property_id: string) {
    this.apiManager.getProperty(property_id).subscribe((property) => {
      this.selectedProperty = property;
    });
  }

  onSubmit() {
    if(!this.selectedProperty.cadastralValue || !this.selectedProperty.constructionValue || !this.selectedProperty.acquisitionValue || !this.selectedProperty.acquisitionCosts) {
      this.toastr.error('Debes editar la propiedad para completar los valores necesarios', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
      return;
    }

    this.apiManager.calculateTaxReturn(this.selectedProperty_id, this.fiscalYear, this.numberOfDaysRented, this.previousYearsImprovements, this.currentYearImprovements).subscribe({
      next: (taxReturn) => {
        this.taxReturn = taxReturn;
        this.isTaxReturnGenerated = true;
      },
      error: (error) => {
        this.toastr.error('Error al generar la declaración de la renta', 'Declaración de la renta', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.isTaxReturnGenerated = false;
      }
    });
  }

  isFormValid() {
    return this.selectedProperty_id && this.fiscalYear && this.numberOfDaysRented;
  }
}
