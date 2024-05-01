import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrlString = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAuthenticated() {
    return this.http
      .post(`${this.backendUrlString}/api/v1/auth/me`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          const user = res['data']['user'];
          const isLoggedIn = !!user;
          if (isLoggedIn) {
            this.currentUserSubject.next(user);
          } else {
            this.currentUserSubject.next(null);
          }
          return isLoggedIn;
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

  signOut() {
    this.http.post('http://localhost:3000/api/v1/auth/signout', {});
  }

  me(): Observable<any> {
    return this.http.get(`${this.backendUrlString}/api/v1/auth/me`, {
      withCredentials: true,
    });
  }

  verifyEmail(email: string, token: string): Observable<any> {
    return this.http.post(`${this.backendUrlString}/api/v1/auth/verify`, {
      email,
      verificationToken: token,
    });
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.backendUrlString}/api/v1/auth/logout`, {
      withCredentials: true,
    });
  }
}
