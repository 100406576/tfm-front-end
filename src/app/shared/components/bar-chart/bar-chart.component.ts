import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarChartData } from '../../models/bar-char-data.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() chartData!: BarChartData;
  @Input() showExportButton = false;
  public chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    const data = {
      labels: this.chartData.labels,
      datasets: [
        {
          label: "Ingresos",
          data: this.chartData.income,
          backgroundColor: 'limegreen'
        },
        {
          label: "Gastos",
          data: this.chartData.expenses,
          backgroundColor: 'red'
        }
      ]
    };

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio:2.5,
        animation: {
          duration: 3000
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Cantidad (€)'
            }
          },
          x: {
            display: true,
            title: {
              display: false,
              text: 'Rango de fechas'
            }
          }
        },
      },
    });
  }

  exportChart() {
    const base64Image = this.chart.toBase64Image();
    const a = document.createElement('a');
    a.href = base64Image;
    a.download = 'balance.png';
    a.click();
  }
}