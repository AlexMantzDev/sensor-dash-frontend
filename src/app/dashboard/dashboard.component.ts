import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartCardComponent } from '../chart-card/chart-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DeviceService } from '../shared/services/device.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartCardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isAsideOpen = true;
  public devices = [];
  private devicesListSubscription: Subscription;

  ngOnInit() {
    this.devicesListSubscription = this.deviceService.devicesList.subscribe(
      (devices) => [(this.devices = devices)]
    );
  }

  ngOnDestroy() {
    if (this.devicesListSubscription) {
      this.devicesListSubscription.unsubscribe();
    }
  }

  constructor(public deviceService: DeviceService) {}

  toggleAside() {}
}
