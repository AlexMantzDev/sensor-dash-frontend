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
  public devices = [];
  private devicesListSubscription: Subscription;
  public isSidenavOpen = false;

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

  toggleMenu() {
    if (!this.isSidenavOpen) {
      this.sidenav.nativeElement.style.width = '254px';
      this.isSidenavOpen = true;
      this.filter.nativeElement.classList.add('filter-active');
      this.filter.nativeElement.classList.remove('filter-inactive');
      this.sidenavContent.nativeElement.classList.add('sidenav-visible');
      this.sidenavContent.nativeElement.classList.remove('sidenav-hidden');
    } else {
      this.sidenav.nativeElement.style.width = '54px';
      this.isSidenavOpen = false;
      this.filter.nativeElement.classList.add('filter-inactive');
      this.filter.nativeElement.classList.remove('filter-active');
      this.sidenavContent.nativeElement.classList.add('sidenav-hidden');
      this.sidenavContent.nativeElement.classList.remove('sidenav-visible');
    }
  }
}
