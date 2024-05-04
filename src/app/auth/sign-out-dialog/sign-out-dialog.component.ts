import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-out-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './sign-out-dialog.component.html',
  styleUrl: './sign-out-dialog.component.css',
})
export class SignOutDialogComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignOutDialogComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSignOut(): void {
    this.authService.logout().subscribe(() => {
      this.dialogRef.close();
      this.authService.currentUserSubject.next(null);
      this.router.navigate(['/login'], { relativeTo: this.route });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  navigateTo(path): void {
    this.dialogRef.close();
    this.router.navigate([path], { relativeTo: this.route });
  }
}
