import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { UserInfoService } from './../../services/user/user-info.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user: SocialUser;
  constructor(
    private authService: SocialAuthService,
    private userInfo: UserInfoService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.userInfo.SessionId = user.email;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      console.log(user);
      this.userInfo.SessionId = user.email;

      const body = {email: user.email, token: user.authToken};
      this.http.post<any>('https://localhost:44378/api/authentication/checkSSO',
        body).subscribe(data => {
        console.log('ZBS');
        // this.postId = data.id;
      });
      this.router.navigate(['home']);
    });
  }

  signOut(): void {
    this.authService.signOut().then(() => {});
  }
}
