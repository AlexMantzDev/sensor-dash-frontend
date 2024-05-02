import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [MatButton],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css',
})
export class PasswordChangeComponent implements OnInit {
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
