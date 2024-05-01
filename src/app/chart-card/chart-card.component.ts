import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.css',
})
export class ChartCardComponent {
  public lineGraphPlugins = [];
  public lineGraphData: ChartConfiguration<
    'line',
    { time: string; temperature: number }[]
  >['data'] = {
    datasets: [
      {
        data: [
          { time: '08:00', temperature: 66 },
          { time: '09:00', temperature: 67 },
          { time: '10:00', temperature: 68 },
          { time: '11:00', temperature: 69 },
          { time: '12:00', temperature: 70 },
          { time: '13:00', temperature: 71 },
          { time: '14:00', temperature: 72 },
          { time: '15:00', temperature: 73 },
          { time: '16:00', temperature: 74 },
          { time: '17:00', temperature: 75 },
        ],
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'temperature',
        },
      },
    ],
  };

  public lineGraphOptions: ChartConfiguration<'line'>['options'] = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        suggestedMax: 120,
        suggestedMin: 30,
        display: true,
        title: {
          display: true,
          text: 'Temperature in F',
        },
      },
    },
  };

  constructor() {}
}
