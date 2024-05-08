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
  selector: 'app-change-pass',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss',
})
export class ChangePassComponent implements OnInit {
  public changePassForm: FormGroup;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.changePassForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: [
          customValidators.passwordMatch,
          customValidators.newPasswordSame,
        ],
      }
    );
  }

  onSubmit() {
    if (this.changePassForm.invalid) return;
    const formValue = this.changePassForm.getRawValue();
    const email = this.authService.currentUserValue.email;
    const oldPassword = formValue.oldPassword;
    const newPassword = formValue.newPassword;

    this.authService.changePassword(email, oldPassword, newPassword).subscribe(
      (res) => {
        this.authService.setCurrentUser(null);
        this.router.navigate(['/change-pass-complete', 'success'], {
          relativeTo: this.route,
        });
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/change-pass-complete', 'failed'], {
          relativeTo: this.route,
        });
        //TODO: pop up error message
      }
    );

    if (!formValue.newPassword || !formValue.confirmPassword) return;
    if (formValue.newPassword !== formValue.confirmPassword) {
      return;
    }
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
