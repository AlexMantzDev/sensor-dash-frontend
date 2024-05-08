import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignOutDialogComponent } from '../sign-out-dialog/sign-out-dialog.component';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuRef') menuRef: ElementRef;
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
    if (this.isMenuOpen) {
      this.menuRef.nativeElement.classList.add('menu-open');
      this.menuRef.nativeElement.classList.remove('menu-closed');
    } else {
      this.menuRef.nativeElement.classList.add('menu-closed');
      this.menuRef.nativeElement.classList.remove('menu-open');
    }
  }

  openDialog() {
    this.dialog.open(SignOutDialogComponent);
  }
}
