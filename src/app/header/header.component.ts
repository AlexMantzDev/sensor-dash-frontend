import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginSignupDialogComponent } from '../auth/login-signup-dialog/login-signup-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, private auth: AuthService) {}

  openDialog() {
    this.dialog.open(LoginSignupDialogComponent);
  }
}
