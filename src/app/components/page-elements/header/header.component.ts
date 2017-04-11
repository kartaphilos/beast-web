import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router }                     from '@angular/router';
import { Logger }                     from 'angular2-logger/core';
import { Subscription }               from 'rxjs/Subscription';

import { GlobalEventsService }    from './../../../core/services'

declare var gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  googleLoginButtonId = "google-login-button";
  userAuthToken = null;
  userDisplayName = "empty";
  googAvatarUrl: string;
  //googAvatarUrl: string = "https://lh6.googleusercontent.com/-aOa7CEqetKM/AAAAAAAAAAI/AAAAAAAAMdk/CYCeF_Zg9LU/s96-c/photo.jpg";

  constructor(
    private eventsService: GlobalEventsService,
    private _logger: Logger,
    private router: Router,
    private zone: NgZone,
  ) {
    this.subscription = eventsService.userLoggedInEvent$.subscribe(
      user => {
        this._logger.log('Header.component - User Logged In: ', user);
    });
    }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
/*
  ngAfterViewInit() {
    gapi.signin2.render(this.googleLoginButtonId, {
      "onSuccess": this.onGoogleLoginSuccess,
      "scope": "profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/contacts.readonly https://www.google.com/m8/feeds/",
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
      this.eventsService.eventUserLogin(loggedInUser);
    });
  }

  onSignIn(googleUser): void {
    let profile = googleUser.getBasicProfile();
    this._logger.log('ID: ' + profile.getId());
    this._logger.log('Name: ' + profile.getName());
    this._logger.log('Image URL: ' + profile.getImageUrl());
    this._logger.log('Email: ' + profile.getEmail());
    this.googAvatarUrl = profile.getImageUrl();
  }

  signOut(): void {
    console.log('Signout called');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }
*/
  gotoUserSettings(): void {
    this.router.navigate(['/settings']);
  }

}
