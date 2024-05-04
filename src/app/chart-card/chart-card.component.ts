import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-moment';
import moment from 'moment-timezone';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { SensorDataService } from '../shared/services/sensor-data.service';
import { Env } from '../shared/env/env';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.css',
})
export class ChartCardComponent implements OnInit {
  @Input() device = {};

  private localizedData: { time: string; temperature: number }[] = [];
  private localTimezone = this.env.timezone;

  public lineGraphData: ChartConfiguration<
    'line',
    { time: string; temperature: number }[]
  >['data'] = {
    datasets: [
      {
        data: this.localizedData,
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
      annotation: {
        annotations: [
          {
            type: 'line',
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 2,
            scaleID: 'x',
            value: '2024-05-01T00:00:00-05:00',
          },
        ],
      },
    },
    responsive: false,
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DDTHH:mm:ssZ',
          tooltipFormat: 'll HH:mm',
          unit: 'hour',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        max: 120,
        min: 30,
        title: {
          display: true,
          text: 'Temperature in F',
        },
      },
    },
  };

  constructor(private sensorDataService: SensorDataService, private env: Env) {
    Chart.register(annotationPlugin);
    moment.tz.setDefault(this.localTimezone);
  }

  ngOnInit() {
    const newData = this.convertDataToLocale(this.sensorDataService.data);
    this.localizedData = [...newData];
    this.lineGraphData.datasets[0].data = this.localizedData;
  }

  convertDataToLocale(
    data: { time: string; temperature: number }[]
  ): { time: string; temperature: number }[] {
    return data.map((item) => {
      return {
        ...item,
        time: moment(Number(item.time) * 1000).format(),
      };
    });
  }
}
