import { Component, OnDestroy, OnInit } from '@angular/core';
import {
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPassSubsription: Subscription;
  public sendResetForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sendResetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    const formValue = this.sendResetForm.getRawValue();
    const email = formValue.email;
    this.forgotPassSubsription = this.authService
      .forgotPassword(email)
      .subscribe(
        (res) => {
          this.router.navigate(['/reset-sent', { relativeTo: this.route }]);
        },
        (err) => {
          console.log(err);
          //TODO pop up error message
        }
      );
  }

  ngOnDestroy() {
    if (this.forgotPassSubsription) {
      this.forgotPassSubsription.unsubscribe();
    }
  }
}
