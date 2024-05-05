import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

import { User } from '../models/User.model';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = env.baseUrl;
  private currentUserSubject = new BehaviorSubject<User>(null); //TODO set to private
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  public authenticate(): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}/api/v1/auth/me`, {
        withCredentials: true,
      })
      .pipe(
        map((res: any) => {
          const user = res.data.user;
          if (user.email) {
            this.currentUserSubject.next(user);
          } else {
            this.currentUserSubject.next(null);
          }
          return !!user.email;
        }),
        catchError(() => {
          this.currentUserSubject.next(null);
          return of(false);
        })
      );
  }

  public register(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/v1/auth/register`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/api/v1/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          const user = res.data.user;
          this.currentUserSubject.next(user);
          return res;
        })
      );
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/v1/auth/forgot-password`,
      {
        email,
      },
      { withCredentials: true }
    );
  }

  public resetPassword(
    email: string,
    token: string,
    password: string
  ): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/api/v1/auth/reset-password`,
        {
          password,
          passwordToken: token,
          email,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          this.currentUserSubject.next(null);
          return res;
        })
      );
  }

  public verifyEmail(email: string, token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/v1/auth/verify`,
      {
        email,
        verificationToken: token,
      },
      { withCredentials: true }
    );
  }

  public changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http
      .post(
        `${this.baseUrl}/api/v1/auth/change-password`,
        {
          email,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          this.currentUserSubject.next(null);
          return res;
        })
      );
  }

  public logout(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/auth/logout`, {
      withCredentials: true,
    });
  }
}
