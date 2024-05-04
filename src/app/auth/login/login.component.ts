import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private loginSubcription: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.getRawValue();
    if (!formValue.email || !formValue.password) return;
    this.loginSubcription = this.authService
      .login(formValue.email, formValue.password)
      .subscribe((res) => {
        const user = res.data.user;
        if (user) {
          this.authService.currentUserSubject.next(user);
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        }
      });
  }

  ngOnDestroy() {
    if (this.loginSubcription) {
      this.loginSubcription.unsubscribe();
    }
  }

  togglePassword(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
