import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartCardComponent } from '../chart-card/chart-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../../shared/services/device.service';
import { Subscription } from 'rxjs';
import { SensorDataService } from '../../shared/services/sensor-data.service';
import { SensorData } from '../../shared/models/SensorData.model';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartCardComponent,
    MatIconModule,
    RouterModule,
    SidenavComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: ElementRef;

  public deviceList = [];
  public sensorData: SensorData[] = [];
  private devListSub: Subscription;

  constructor(
    public deviceService: DeviceService,
    public sensorDataService: SensorDataService
  ) {}

  ngOnInit() {
    this.sensorDataService.getAllData().subscribe((data) => {
      const sensorDataMap =
        this.sensorDataService.sortSensorDataByDeviceId(data);
      const devices = [];
      for (let [device, sensorData] of sensorDataMap) {
        devices.push(device);
      }
      this.deviceService.setDeviceList(devices);
    });

    this.devListSub = this.deviceService.deviceList.subscribe((devices) => {
      this.deviceList = devices;
    });
  }

  ngOnDestroy() {
    if (this.devListSub) {
      this.devListSub.unsubscribe();
    }
  }
}
