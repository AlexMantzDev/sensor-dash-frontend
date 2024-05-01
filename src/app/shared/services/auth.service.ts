import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    this.http
      .post<User>('http://localhost:3000/api/v1/auth/login', {
        email,
        password,
      })
      .subscribe((user) => {
        this.currentUserSubject.next(user);
      });
  }

  signOut() {
    this.http
      .post('http://localhost:3000/api/v1/auth/signout', {})
      .subscribe(() => {
        this.currentUserSubject.next(undefined);
      });
  }
}
