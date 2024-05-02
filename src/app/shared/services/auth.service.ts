import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrlString = 'http://localhost:3000';
  public currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  authenticate() {
    return this.http
      .get(`${this.backendUrlString}/api/v1/auth/me`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const user = res['data']['user'];
          this.isAuthenticated = true;
          if (this.isAuthenticated) {
            this.currentUserSubject.next(user);
          } else {
            this.currentUserSubject.next(null);
          }
          return this.isAuthenticated;
        }),
        catchError(() => {
          this.currentUserSubject.next(null);
          return of(false);
        })
      );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/register`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/forgot-password`,
      {
        email,
      },
      { withCredentials: true }
    );
  }

  resetPassword(
    email: string,
    token: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/reset-password`,
      {
        password,
        passwordToken: token,
        email,
      },
      { withCredentials: true }
    );
  }

  verifyEmail(email: string, token: string): Observable<any> {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/verify`,
      {
        email,
        verificationToken: token,
      },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.backendUrlString}/api/v1/auth/logout`, {
      withCredentials: true,
    });
  }
}
