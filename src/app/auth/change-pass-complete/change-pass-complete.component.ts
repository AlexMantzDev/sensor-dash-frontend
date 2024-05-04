import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-pass-complete',
  standalone: true,
  imports: [MatButton],
  templateUrl: './change-pass-complete.component.html',
  styleUrl: './change-pass-complete.component.css',
})
export class ChangePassCompleteComponent implements OnInit {
  public status: string;
  public msg: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.status = params['status'];
    });
  }

  onClick() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
