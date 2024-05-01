import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private authSubscription: any = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    const formValue = this.loginForm.getRawValue();
    if (!formValue.email || !formValue.password) return;
    this.authSubscription.add(
      this.authService
        .login(formValue.email, formValue.password)
        .subscribe((res) => {
          const user = res.data.user;
          console.log(user);
        })
    );
  }

  toRegister() {}
}
