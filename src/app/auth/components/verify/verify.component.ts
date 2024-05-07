import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  msg: string;
  routeSubscription: Subscription;
  isSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      const token = params['token'];

      this.authService.verifyEmail(email, token).subscribe(
        (res) => {
          this.isSuccess = true;
          this.msg = 'Email verified';
        },
        (err) => {
          this.isSuccess = false;
          this.msg = 'Something went wrong. Please try again.';
          console.log(err);
        }
      );
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
