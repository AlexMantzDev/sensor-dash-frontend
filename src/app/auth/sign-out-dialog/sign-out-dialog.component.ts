import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-out-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './sign-out-dialog.component.html',
  styleUrl: './sign-out-dialog.component.css',
})
export class SignOutDialogComponent implements OnDestroy {
  private logoutSubscription: Subscription;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignOutDialogComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSignOut(): void {
    this.logoutSubscription = this.authService.logout().subscribe(
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

  ngOnDestroy() {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  navigateTo(path): void {
    this.dialogRef.close();
    this.router.navigate([path], { relativeTo: this.route });
  }
}
