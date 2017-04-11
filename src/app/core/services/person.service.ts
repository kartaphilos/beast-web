import { Injectable }     from '@angular/core';
import { Headers, Http, Response }	from '@angular/http';
import { Logger }					from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { Observable }       from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';

import { Person } from './../models';
import { GlobalEventsService, GoogleApiService } from './../services'


@Injectable()
export class PersonService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private personUrl = 'api/person';

  constructor(
    private _logger: Logger,
    private googleService: GoogleApiService,
    private eventsService: GlobalEventsService,
    private http: Http
  ) { }

/*  getPersons(): Promise<Person[]> {
    return this.http.get(this.personUrl)
      .toPromise()
      .then<Person>((response) => {
        response.json().data as Person[];
      })
      .catch(this.handleError);

*/
    /*
    Two strategies:
    1) get persons and for each person make goog call for that person -> Slow for lots of app contacts
    2) get persons and get google contacts list and combine by person id key (source_id).  Could be slow if only a few app contacts
    Go with #2
    Compare and array of local persons (from /api/persons) with array of contacts from GoogleApiService
    Common key is person.source_id == google.resourceName
    Don't want to make a call to Google for each id.  Make one call and create array of contacts.
    For each id in local persons => find id in Google array and extract required data
    this.beastpersons[] = getBeastPersons()
      .then( (p) => {
      googleService.getPersonsInGroup().subscribe.map(find id)
      p = goog mapping
    })
  }
*/


  getPerson(id: string): Observable<Person> {
    // Get local Person (Observable?)
    let person$ = this.http.get(`${this.personUrl}/${id}`)
      .map(this.mapPerson.bind(this));
    return person$;

    // Use flatMap to combine both calls
    // get google person from source_id
    // Function to pick elements form google person (not an array so just pick json objects.) (use this in persons)
  }

  mapPerson(response: Response): Person {
    return response.json().data as Person; // why can't I do this 1-liner inline in the get Person?
  }

  update(): void { }

  create(p: Person): void { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
