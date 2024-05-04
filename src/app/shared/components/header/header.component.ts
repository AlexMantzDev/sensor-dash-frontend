import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignOutDialogComponent } from '../../../auth/sign-out-dialog/sign-out-dialog.component';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  public currentUser: User;
  private userSubscription: Subscription;
  public isMenuOpen = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  openDialog() {
    this.dialog.open(SignOutDialogComponent);
  }
}
