import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-signup-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    SignUpComponent,
    LoginComponent,
  ],
  templateUrl: './login-signup-dialog.component.html',
  styleUrl: './login-signup-dialog.component.css',
})
export class LoginSignupDialogComponent {
  public formState = 0;

  constructor(public dialogRef: MatDialogRef<LoginSignupDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
