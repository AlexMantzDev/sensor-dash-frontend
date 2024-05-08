import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-out-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './sign-out-dialog.component.html',
  styleUrl: './sign-out-dialog.component.scss',
})
export class SignOutDialogComponent {
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<SignOutDialogComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSignOut(): void {
    this.authService.logout().subscribe(
      (res) => {
        this.dialogRef.close();
        this.authService.setCurrentUser(null);
        this.router.navigate(['/login'], { relativeTo: this.route });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  toChangePass(): void {
    this.dialogRef.close();
    this.router.navigate(['/change-pass'], { relativeTo: this.route });
  }
}
