import { Component } from '@angular/core';
import { GlobalEventsService, GoogleApiService }    from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Beast Web';

  constructor (
    private _googleApiService: GoogleApiService
  ) {
        _googleApiService.init();
    }
}
