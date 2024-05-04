import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
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
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.passwordToken = params['token'];
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password').value ===
      control.get('confirmPassword').value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordResetForm.invalid) return;
    const formValue = this.passwordResetForm.getRawValue();
    const newPassword = formValue.password;

    this.authService
      .resetPassword(this.email, this.passwordToken, newPassword)
      .subscribe(
        () => {
          this.router.navigate(['/change-pass-complete', 'success'], {
            relativeTo: this.route,
          });
        },
        () => {
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
