import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteDeviceComponent } from '../dialog-delete-device/dialog-delete-device.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, MatButtonModule, MatIconModule],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent implements OnInit, OnDestroy {
  @Input() device: string;
  @Output() openDialogEvent = new EventEmitter<string>();
  @Output() dialogInputEvent = new EventEmitter<string>();
  private sensorDataSub: Subscription;
  private deleteDialogSub: Subscription;
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
          display: false,
          text: '',
        },
      },
    },
  };

  constructor(
    private sensorDataService: SensorDataService,
    public dialog: MatDialog
  ) {
    Chart.register(annotationPlugin);
    moment.tz.setDefault(env.timezone);
  }

  ngOnInit() {
    this.sensorDataSub = this.sensorDataService.sensorData.subscribe((data) => {
      if (data) {
        const filteredData = this.filterDataDeviceId(data, this.device);
        const updatedData = this.convertDataToLocale(filteredData);
        const trimmedData = updatedData.slice(-env.maxDataPoints);
        const temperatureData = this.filterDataTemperature(trimmedData);
        const humidityData = this.filterDataHumidity(trimmedData);
        this.updateGraphData(temperatureData, humidityData);
      }
    });
  }

  ngOnDestroy() {
    if (this.deleteDialogSub) {
      this.deleteDialogSub.unsubscribe();
    }
    if (this.sensorDataSub) {
      this.sensorDataSub.unsubscribe();
    }
  }

  updateGraphData(t, h): void {
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

  openDeleteDialog($deviceId: string) {
    this.openDialogEvent.emit($deviceId);
    const dialogRef = this.dialog.open(DialogDeleteDeviceComponent, {
      data: { deviceId: $deviceId },
    });
    this.deleteDialogSub = dialogRef.afterClosed().subscribe((result) => {
      this.dialogInputEvent.emit(result);
    });

    dialogRef.componentInstance.deviceId = $deviceId;
  }
}
