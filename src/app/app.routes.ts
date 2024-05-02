import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { authGuard } from './auth/auth.guard';
import { PasswordChangeComponent } from './auth/password-change/password-change.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetSentComponent } from './auth/reset-sent/reset-sent.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify/:token/:email', component: VerifyComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change/:status', component: PasswordChangeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-sent', component: ResetSentComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
