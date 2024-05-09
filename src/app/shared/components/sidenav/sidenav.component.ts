import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartCardComponent } from '../../../components/chart-card/chart-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../../services/device.service';
import { DialogDummyDataComponent } from '../../../components/dialog-dummy-data/dialog-dummy-data.component';
import { MatDialog } from '@angular/material/dialog';
import { SensorDataService } from '../../services/sensor-data.service';
import { SensorData } from '../../models/SensorData.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ChartCardComponent, MatIconModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: ElementRef;

  public isSidenavOpen = false;

  constructor(
    public deviceService: DeviceService,
    public sensorDataService: SensorDataService,
    public dialog: MatDialog
  ) {}

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
