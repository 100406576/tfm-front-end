import { Component } from '@angular/core';
import { BarChartData } from '../shared/models/bar-char-data.model';
import { Property } from '../shared/models/property.model';
import { ApiRestManagerService } from '../shared/services/api-rest-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent {
  charData!: BarChartData;
  properties!: Property[];
  selectedProperty_id: string = '';
  selectedDateRange: string = '';
  customStartDate: Date = new Date();
  customEndDate: Date = new Date();
  selectedTimeInterval: string = '';
  isBalanceGenerated: boolean = false;

  constructor(public apiManager: ApiRestManagerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiManager.getUserProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  generateBalance() {
    this.isBalanceGenerated = false;
    const dateRange = this.calculateDateRange();
    this.apiManager.createBalance(this.selectedProperty_id, dateRange, this.selectedTimeInterval).subscribe({
      next: (barChartData) => {
        this.charData = barChartData;
        this.isBalanceGenerated = true;
      },
      error: (error) => {
        this.toastr.error('Error al generar el balance', 'Balance', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
        this.isBalanceGenerated = false;
      }
    });
  }

  calculateDateRange(): { startDate: Date, endDate: Date } {
    let endDate = new Date();
    endDate.setDate(1); // Set the end date to the first day of the current month
    let startDate = new Date(endDate);

    if (['0', '1', '3', '6', '12'].includes(this.selectedDateRange)) {
      if (this.selectedDateRange !== '0') {
        startDate.setMonth(startDate.getMonth() - Number(this.selectedDateRange));
        startDate.setDate(1);
        endDate.setDate(endDate.getDate() - 1); // Set the end date to the last day of the previous month
      } else { // current month
        startDate.setDate(1);
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      }
    } else { // custom range
      startDate = this.customStartDate;
      endDate = this.customEndDate;
    }

    return { startDate, endDate };
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