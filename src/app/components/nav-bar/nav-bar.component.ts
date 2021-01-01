import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private authService: SocialAuthService, public router: Router) {}

  logOutFromGoogle(): void {
    sessionStorage.clear();
    location.reload();
  }

  ngOnInit(): void {}
}
