import { Component } from '@angular/core';
import { ChartCardComponent } from '../chart-card/chart-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../shared/services/device.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartCardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public isAsideOpen = true;
  public devices = [];

  public devicesListSubscription = this.deviceService.devicesList.subscribe(
    (devices) => [(this.devices = devices)]
  );

  constructor(public deviceService: DeviceService) {}

  toggleAside() {}
}
