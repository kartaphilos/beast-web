import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Logger }             from 'angular2-logger/core';
import { Subscription }       from 'rxjs/Subscription';

import { GlobalEventsService } from './../../../core/services/';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  subscription: Subscription;
  googleUser: any;
  name: string;
  email: string;

  constructor(
    private eventsService: GlobalEventsService,
    private _logger: Logger,
    private router: Router,
  ) {
    this.subscription = eventsService.userLoggedInEvent$.subscribe(
      user => {
        this._logger.log('Settings.component - User Logged In: ', user);
        this.googleUser = user;
        this.name = user.getBasicProfile().getName();
        this._logger.log('SettingsComponent: User Name: ', this.name);
        
    });
  }

  ngOnInit() {
    this._logger.log('Settings has arrived!');
  }

}
