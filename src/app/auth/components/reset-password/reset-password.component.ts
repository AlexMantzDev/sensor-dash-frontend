import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { customValidators } from '../../../shared/lib/custom-validators';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  private passwordToken: string;
  private email: string;
  public passwordResetForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.passwordResetForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: customValidators.passwordMatch }
    );

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.passwordToken = params['token'];
    });
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) return;
    const formValue = this.passwordResetForm.getRawValue();
    const newPassword = formValue.password;

    this.authService
      .resetPassword(this.email, this.passwordToken, newPassword)
      .subscribe(
        (res) => {
          this.router.navigate(['/change-pass-complete', 'success'], {
            relativeTo: this.route,
          });
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/change-pass-complete', 'failed'], {
            relativeTo: this.route,
          });
        }
      );

    if (!formValue.password || !formValue.confirmPassword) return;
    if (formValue.password !== formValue.confirmPassword) {
      return;
    }
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
