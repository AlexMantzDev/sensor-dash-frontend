import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignOutDialogComponent } from '../../../auth/sign-out-dialog/sign-out-dialog.component';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public user: User;
  public userSubscription: Subscription;
  public isMenuOpen = false;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openDialog() {
    this.dialog.open(SignOutDialogComponent);
  }
}
