import { Component, OnInit } from '@angular/core';
import { Router }                 from '@angular/router';
import { Logger }                 from 'angular2-logger/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _logger: Logger,
    private router: Router,
  ) { }

  ngOnInit() {
    this._logger.log('Settings has arrived!');
  }

}
