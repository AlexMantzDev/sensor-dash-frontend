import { Component, OnInit } from '@angular/core';
import {
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
import { AuthService } from '../../auth.service';
import { customValidators } from '../../../shared/lib/custom-validators';

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
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});

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
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: customValidators.passwordMatch }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const formValue = this.registerForm.getRawValue();
    if (!formValue.email || !formValue.password || !formValue.confirmPassword)
      return;
    if (formValue.password !== formValue.confirmPassword) {
      return;
    }
    this.authService.register(formValue.email, formValue.password).subscribe(
      (res) => {
        this.router.navigate(['/validation-sent', { relativeTo: this.route }]);
      },
      (err) => {
        console.log(err);
        //TODO pop up error message
      }
    );
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
