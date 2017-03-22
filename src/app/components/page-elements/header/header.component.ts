import { Component, OnInit, NgZone } from '@angular/core';
import { Router }                 from '@angular/router';
import { Logger }                 from 'angular2-logger/core';

declare var gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  googleLoginButtonId = "google-login-button";
  userAuthToken = null;
  userDisplayName = "empty";

  constructor(
    private _logger: Logger,
    private router: Router,
    private zone: NgZone,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    gapi.signin2.render(this.googleLoginButtonId, {
      "onSuccess": this.onGoogleLoginSuccess,
      "scope": "profile",
      "theme": "dark"
    });
  }

  onGoogleLoginSuccess = (loggedInUser) => {
    this.zone.run(() => {
      this.userAuthToken = loggedInUser.getAuthResponse().id_token;
      this.userDisplayName = loggedInUser.getBasicProfile().getName();
      let profile = loggedInUser.getBasicProfile();
      this._logger.log('ID: ' + profile.getId());
      this._logger.log('Name: ' + profile.getName());
      this._logger.log('Image URL: ' + profile.getImageUrl());
      this._logger.log('Email: ' + profile.getEmail());
    });
  }

  onSignIn(googleUser): void {
    let profile = googleUser.getBasicProfile();
    this._logger.log('ID: ' + profile.getId());
    this._logger.log('Name: ' + profile.getName());
    this._logger.log('Image URL: ' + profile.getImageUrl());
    this._logger.log('Email: ' + profile.getEmail());
  }

  signOut(): void {
    console.log('Signout called');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

  gotoUserSettings(): void {
    this.router.navigate(['/settings']);
  }

}
