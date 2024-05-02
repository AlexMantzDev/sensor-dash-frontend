import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private passwordToken: string;
  private email: string;
  public passwordResetForm: FormGroup;
  private authSubscription: any = new Subscription();
  public status: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.passwordToken = params['token'];
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) return;
    const formValue = this.passwordResetForm.getRawValue();
    const newPassword = formValue.password;

    this.authService
      .resetPassword(this.email, this.passwordToken, newPassword)
      .subscribe(
        (res) => {
          this.router.navigate(['/password-change', 'success'], {
            relativeTo: this.route,
          });
        },
        (err) => {
          this.router.navigate(['/password-change', 'failed'], {
            relativeTo: this.route,
          });
        }
      );

    if (!formValue.password || !formValue.confirmPassword) return;
    if (formValue.password !== formValue.confirmPassword) {
      return;
    }
  }
}
