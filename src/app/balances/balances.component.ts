import { Component } from '@angular/core';
import { BarChartData } from '../shared/models/bar-char-data.model';
import { Property } from '../shared/models/property.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent {
  charData: BarChartData;
  properties!: Property[];
  selectedProperty_id: string = '';
  selectedDateRange: string = '';
  customStartDate: Date = new Date();
  customEndDate: Date = new Date();
  selectedTimeInterval: string = '';
  isGeneratingBalance: boolean = false;

  constructor(public apiManager: ApiRestManagerService) {
    this.charData = new BarChartData(
      ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    );
  }

  ngOnInit() {
    this.apiManager.getUserProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  generateBalance() {
    this.isGeneratingBalance = true;
  
    const data = {
      propertyId: this.selectedProperty_id,
      dateRange: this.selectedDateRange,
      timeInterval: this.selectedTimeInterval
    };
  
    alert(JSON.stringify(data));
  }

  calculateMonthsInRange(): number {
    const startDate = new Date(this.customStartDate);
    const endDate = new Date(this.customEndDate);

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
    }

    months += years * 12;

    return months <= 0 ? 0 : months;
}
}