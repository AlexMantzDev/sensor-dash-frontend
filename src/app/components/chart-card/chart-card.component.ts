import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-moment';
import moment from 'moment-timezone';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { SensorDataService } from '../../shared/services/sensor-data.service';
import { env } from '../../environments/environment';
import { SensorData } from '../../shared/models/SensorData.model';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent implements OnInit {
  @Input() device;
  private localTimezone = env.timezone;
  public chartData: ChartConfiguration<'line', any>['data'];

  public lineGraphOptions: ChartConfiguration<'line'>['options'] = {
    plugins: {
      legend: {
        display: true,
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

  constructor(private sensorDataService: SensorDataService) {
    Chart.register(annotationPlugin);
    moment.tz.setDefault(this.localTimezone);
  }

  ngOnInit() {
    this.sensorDataService.sensorData.subscribe((data) => {
      if (data) {
        console.log(this.device);
        const filteredData = this.filterDataDeviceId(data, this.device);
        const updatedData = this.convertDataToLocale(filteredData);
        const temperatureData = this.filterDataTemperature(updatedData);
        const humidityData = this.filterDataHumidity(updatedData);
        this.updateGraphData(temperatureData, humidityData);
      }
    });
  }

  private updateGraphData(t, h): void {
    const data: ChartConfiguration<'line', any>['data'] = {
      datasets: [
        {
          label: 'Temperature',
          data: t,
          parsing: {
            xAxisKey: 'timestamp',
            yAxisKey: 'temperature',
          },
        },
        {
          label: 'Humidity',
          data: h,
          parsing: {
            xAxisKey: 'timestamp',
            yAxisKey: 'humidity',
          },
        },
      ],
    };
    this.chartData = data;
  }

  convertDataToLocale(dataList: SensorData[]): any {
    return dataList.map((dataEntry) => {
      const local = moment
        .utc(Number(dataEntry.data.timestamp))
        .local()
        .format();
      return {
        ...dataEntry,
        data: {
          ...dataEntry.data,
          timestamp: local,
        },
      };
    });
  }

  filterDataDeviceId(data: SensorData[], deviceId: string) {
    return data.filter((entry) => entry.device === deviceId);
  }

  filterDataTemperature(data: SensorData[]) {
    return data.map((entry) => {
      return {
        temperature: entry.data.temperature,
        timestamp: entry.data.timestamp,
      };
    });
  }

  filterDataHumidity(data: SensorData[]) {
    return data.map((entry) => {
      return {
        humidity: entry.data.humidity,
        timestamp: entry.data.timestamp,
      };
    });
  }
}
