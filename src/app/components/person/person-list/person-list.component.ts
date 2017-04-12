import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }                       from '@angular/router';
import { Logger }                       from 'angular2-logger/core';
import { Subscription }                 from 'rxjs/Subscription';

import { Person }                                from './../../../core/models';
import { GlobalEventsService, GoogleApiService, PersonService } from './../../../core/services'

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  persons: Person[]; // = <Person[]>[{ name: {}, source: 'google' }];

  constructor(
    private eventsService: GlobalEventsService,
    private googleService: GoogleApiService,
    private personService: PersonService,
    private _logger: Logger,
    private router: Router,
  ) {
    this.subscription = eventsService.userLoggedInEvent$.subscribe(
      user => {
        this._logger.log('Person.component - User Logged In: ', user);
        this._logger.log('Person.Component - User Name: ', user.getBasicProfile().getName());
      });
  }

  ngOnInit() {
    this._logger.debug('Person-list: ngOninit');
    this.getPersons();
  }

  getPersons(): void {
    //this.googleService.getUsersConnections()
    //  .then(persons => this.persons = persons);
    this.personService.getPersons()
      .subscribe( p => this.persons = p);
  }

  gotoDetail(person: Person): void {
    this._logger.debug('person_id: ', person.id);
    this.router.navigate(['/person/detail', person.id]);
  }

/*
    this.loadClient()
      .then((resolve) => {
        this._logger.log('loadClient Promise resolved: ', resolve);
        this.initClient()
          .then((res) => {
            this._logger.log('InitClient resovled: ', res);
            gapi.client.request(res)
              .then(this._logger.warn('Gapi.client.request... Got this far what now?'))
              .catch(this._logger.error('request all fucked'))
          })
      })
      .catch((err) => this._logger.error('Error in gapi loadClient'))
*/
    /*
        gapi.client.init({
          'apiKey': 'AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q',
          // clientId and scope are optional if auth is not required.
          'clientId': '599582959655-jvalrr5t00f115dfebj47oktj02fup9k.apps.googleusercontent.com',
          'scope': 'profile',
        }).then(function() {
          return gapi.client.request({
            'path': 'https://people.googleapis.com/v1/people/me',
          })
        }).then(function(response) {
          this._logger.log(response.result);
        }, function(reason) {
          this._logger.error('Error: ' + reason.result.error.message);
        });
    */


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
/*
  loadClient(): Promise<any> {
    this._logger.debug('Load Client entered');
    return new Promise(resolve => {
      gapi.load('client', resolve);
    });
  }


  initClient(): Promise<any> {
    this._logger.debug('Init Client entered');
    return new Promise(resolve => {
      let API_KEY = 'AIzaSyCVW-AvkNcqGNcLaavfN0UNCST96fEe86Q';
      let DISCOVERY_DOC = 'https://www.google.com/m8/feeds/groups/default/full?alt=json';
      let CLIENT_ID = '599582959655-jvalrr5t00f115dfebj47oktj02fup9k.apps.googleusercontent.com'
      let SCOPE = 'https://www.google.com/m8/feeds/'
      var initObj = {
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'discoveryDocs': [DISCOVERY_DOC],
        'scope': SCOPE
      };
      this._logger.debug('Init Client: initObj: ', initObj);
      gapi.client.init(initObj)
      .then(resolve)
      //.catch(reason);
    });
  }
*/
}
