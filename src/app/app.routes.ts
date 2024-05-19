import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { VerifyComponent } from './auth/components/verify/verify.component';
import { authGuard } from './auth/auth.guard';
import { ChangePassCompleteComponent } from './auth/components/change-pass-complete/change-pass-complete.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetSentComponent } from './auth/components/reset-sent/reset-sent.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { ValidationSentComponent } from './auth/components/validation-sent/validation-sent.component';
import { ChangePassComponent } from './auth/components/change-pass/change-pass.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'change-pass',
    canActivate: [authGuard],
    component: ChangePassComponent,
  },
  {
    path: 'change-pass-complete/:status',
    component: ChangePassCompleteComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-sent', component: ResetSentComponent },
  { path: 'validation-sent', component: ValidationSentComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
