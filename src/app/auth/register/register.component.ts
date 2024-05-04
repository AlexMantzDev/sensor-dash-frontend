import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup = new FormGroup({});
  private registerSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password').value ===
      control.get('confirmPassword').value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const formValue = this.registerForm.getRawValue();
    if (!formValue.email || !formValue.password || !formValue.confirmPassword)
      return;
    if (formValue.password !== formValue.confirmPassword) {
      return;
    }
    this.registerSubscription = this.authService
      .register(formValue.email, formValue.password)
      .subscribe(() => {
        this.router.navigate(['/validation-sent', { relativeTo: this.route }]);
      });
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
