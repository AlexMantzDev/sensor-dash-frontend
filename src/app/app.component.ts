import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DashboardComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sensor-dash';
  constructor() {}
}
