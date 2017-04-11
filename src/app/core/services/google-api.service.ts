import { Injectable } from '@angular/core';
import { Logger }       from 'angular2-logger/core';

import { Person }    from './../../core/models'
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
  private isUserSignedIn: boolean = false;
  private gapiClientInitialised: boolean = false;
  private persons: Person[];

  constructor(
    private _logger: Logger,
  ) {
    this._logger.debug('Goog Service constructor');
  }

  init() {  //load JS libraries & init client for each disc doc (via callback on load).
    this._logger.debug('Goog Service init()');
    this._logger.debug('init this: ', this);
    gapi.load('client:auth2', this.initGoogClient.bind(this));  //This worked
  }

  initGoogClient(): void {
    this._logger.debug('InitGoogClient');
    gapi.client.init({
      apiKey: 'AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q',
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"], // Add more discovery docs here
      clientId: '599582959655-jvalrr5t00f115dfebj47oktj02fup9k.apps.googleusercontent.com',
      scope: 'profile'
    })
      .then(() => {
        this._logger.debug('In gapi.init .then()');
        // Listen for sign-in state changes & get initial state.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        this.gapiClientInitialised = true;
        // For testing call endpoint after init.
        this._logger.debug('ClientInit: ', this.gapiClientInitialised);
        this._logger.debug('UserLogged in: ', this.isUserSignedIn);
        this.getUsersConnections();
        /*  .then((onFulfilled) => {
            console.log(onFulfilled.result);
          }, (onRejected) => {
            console.log('Error: ' + onRejected.result.error.message);
          });
        */
      })
  }

  googleLogin(): void {
    gapi.auth2.getAuthInstance().signIn();
  }

  googleLogout(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

  // ENDPOINTS
  getUsersConnections(): Promise<Person[]> {
    if (this.isUserSignedIn && this.gapiClientInitialised) {
      return gapi.client.people.people.get({
        resourceName: 'people/me/connections'
      })
        .then( (onFullfilled) => {
          let persons: Person[] = [];
          //let i = 0;
          onFullfilled.result.connections.forEach( (contact) => {
            //p.push( contact.resourceName, contact.
            this._logger.debug('id: ', contact.resourceName, ' name: ', contact.names[0].givenName);
            let p: Person = <Person>{ name: {}, source: 'Google' };
            p.source_id = contact.resourceName;
            p.name.given = contact.names[0].givenName;
            p.name.family = contact.names[0].familyName;
            p.name.display = contact.names[0].displayName;
            persons.push(p);
            //i++
          });
          return persons;
        })
    }
  }


  getPersonsInGroup(): Promise<Person[]> {
    return;
  }

  getPerson(id: string): Promise<Person> {
    return;
  }

  updateSigninStatus(isSignedIn: boolean): void {  // Can't we just make call everytime?
    // When signin status changes we set a variable.
    this._logger.debug('In updateSignInStatus()');
    if (isSignedIn) {
      this._logger.debug('In updateSignInStatus: isSignedIn TRUE');
      this.isUserSignedIn = true;
    } else {
      this._logger.debug('In updateSignInStatus: isSignedIn FALSE');
      this.isUserSignedIn = false;
    }
  }

}
