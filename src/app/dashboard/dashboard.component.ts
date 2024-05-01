import { Component } from '@angular/core';
import { ChartCardComponent } from '../chart-card/chart-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public devices = ['123123'];
}
