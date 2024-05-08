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
import { DialogDummyDataComponent } from '../dialog-dummy-data/dialog-dummy-data.component';
import { MatDialog } from '@angular/material/dialog';
import { SensorDataService } from '../../shared/services/sensor-data.service';
import { SensorData } from '../../shared/models/SensorData.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartCardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: ElementRef;
  public isAsideOpen = true;
  public deviceList = [];
  public sensorData: SensorData[] = [];
  private sensorDataSubscription: Subscription;
  public isSidenavOpen = false;

  constructor(
    public deviceService: DeviceService,
    public sensorDataService: SensorDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sensorDataSubscription = this.sensorDataService
      .getAllDataByUserId()
      .subscribe((data) => {
        const sensorDataMap =
          this.sensorDataService.sortSensorDataByDeviceId(data);
        for (let [device, sensorData] of sensorDataMap) {
          this.deviceList.push(device);
        }
      });
  }

  ngOnDestroy() {
    if (this.sensorDataSubscription) {
      this.sensorDataSubscription.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(DialogDummyDataComponent);
  }

  toggleMenu() {
    if (!this.isSidenavOpen) {
      this.isSidenavOpen = true;
      this.sidenav.nativeElement.style.width = '254px';
      this.sidenavContent.nativeElement.classList.add('sidenav-visible');
      this.sidenavContent.nativeElement.classList.remove('sidenav-hidden');
    } else {
      this.isSidenavOpen = false;
      this.sidenav.nativeElement.style.width = '54px';
      this.sidenavContent.nativeElement.classList.add('sidenav-hidden');
      this.sidenavContent.nativeElement.classList.remove('sidenav-visible');
    }
  }
}
