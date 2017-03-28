import { Injectable } from '@angular/core';
import { Logger }       from 'angular2-logger/core';

import { GlobalEventsService }    from './../../core/services'

@Injectable()
export class GoogleApiService {
  //What does this Service do??
  /*
  *  Provide functions that call gapi endpoints - returning promises for resolution.
  *  endpoints?:
  *       - Auth2 -> Login/Logout... render in component, this just makes call to gapi auth2
  *       - Contacts -> get all contacts in groups.  Maybe do some parsing and return a nicer structure.
  *       - maps?? get a map or just API key to make call locally with the nice maps ng2 module
  *
  *     Puzzle: is how to know the libs are loaded prior to use?  Do this in index without defer or async?  gonna need them anyway
  */

  private clientLoaded: boolean = false;


  constructor(
    private _logger: Logger,
  ) {
    this._logger.debug('Goog Service constructor');
  }

  init() {
    this._logger.debug('Goog Service init()');
    this._logger.debug('init this: ', this);
    gapi.load('client', this.initGoog.bind(this));  //This worked
    //gapi.load('client', this.clientLoaded = true);
  }


  initGoog(): void {
    console.log('InitGoog This: ', this);
    this._logger.debug('GoogService In InitGoog');
    let peopleListParams = {
      resourceName: 'people/me'
    }
    //gapi.client.setApiKey('AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q'); // Just to see if gapi.client defined....
    gapi.client.init({
      apiKey: 'AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q',
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
      clientId: '599582959655-jvalrr5t00f115dfebj47oktj02fup9k.apps.googleusercontent.com',
      scope: 'profile'
    })
      .then(() => {
        this._logger.debug('In gapi.init .then()');
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this._logger.debug('In gapi.init. Calling updateSigninStatus');
        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        return gapi.client.people.people.get({
          resourceName: 'people/me/connections'
        })
        /*return gapi.client.request({
          'path': 'https://people.googleapis.com/v1/people/me/connections',
        })*/
      })
      .then((response) => {
        console.log(response.result);
      }, (reason) => {
        console.log('Error: ' + reason.result.error.message);
      });
  }


  updateSigninStatus(isSignedIn): void {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    this._logger.debug('In updateSignInStatus()');
    if (isSignedIn) {
      this._logger.debug('In updateSignInStatus: isSignedIn true');
      // Do Stuff makeApiCall();
    }
  }

}
