import { Component, OnInit } from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  constructor(private authService: SocialAuthService, public router: Router) {

  }


  logOutFromGoogle(): void{

    this.authService.signOut().then((user) => {
      console.log(user);
      this.router.navigate(['log-in']);
    });
  }

  ngOnInit(): void {}

}
