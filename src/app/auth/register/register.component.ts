import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  private authSubscription: any = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toLogin() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const formValue = this.registerForm.getRawValue();
    if (!formValue.email || !formValue.password || !formValue.confirmPassword)
      return;
    if (formValue.password !== formValue.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    this.authSubscription.add(
      this.authService
        .register(formValue.email, formValue.password)
        .subscribe((res) => {
          this.router.navigate(['/login']);
        })
    );
  }
}
