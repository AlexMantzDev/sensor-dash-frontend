import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-pass-complete',
  standalone: true,
  imports: [MatButton],
  templateUrl: './change-pass-complete.component.html',
  styleUrl: './change-pass-complete.component.css',
})
export class ChangePassCompleteComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  public status: string;
  public msg: string;

  constructor(public router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params) => {
        this.status = params['status'];
      },
      (err) => {
        console.log(err);
        //TODO pop up error message
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onClick() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
