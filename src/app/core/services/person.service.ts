import { Injectable }     from '@angular/core';
import { Headers, Http, Response }	from '@angular/http';
import { Logger }					from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { Observable }       from 'rxjs/Observable';
//import 'rxjs/add/operator/toPromise';

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

  getPersons(): Observable<Person[]> {
    let persons$ = Observable.forkJoin([
      this.http.get(this.personUrl).map(this.mapPersons.bind(this)),
      this.googleService.getUsersConnections()
    ])
      .map((data: any[]) => {
        this._logger.debug('persons: ', data[0]);
        this._logger.debug('goog contacts: ', data[1]);
        // Combine arrays together by key...
        const combined = data[0].map((p: Person) => {
          return Object.assign({}, p, data[1].filter((g: Person) => g.id === p.id)[0]);
        });
        this._logger.debug('Combined contacts: ', combined);
        return combined;
      })
      .catch(this.handleError);
    return persons$;
  }

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
    let person$ = this.http.get(`${this.personUrl}/${id}`)
      .map(this.mapPerson.bind(this));
    return person$;

    // Use mergeMap to combine both calls
    // get google person from source_id
    // Use destructuring (or 'pick')to pick out fields from google object to add to person object
  }

  mapPerson(response: Response): Person {
    return response.json().data as Person; // why can't I do this 1-liner inline in the get Person?
  }

  mapPersons(response: Response): Person[] {
    let results = response.json().data as Person[];
    this._logger.debug('mapPersons: ', results);
    return results; //.map(toPerson)
  }

  update(person: Person): Promise<Person> {
    const url = `${this.personUrl}/${person.id}`;
    return this.http
      .put(url, JSON.stringify(person), { headers: this.headers })
      .toPromise()
      .then(() => person)
      .catch(this.handleError);
  }


  create(person: Person): Promise<Person> {
    return this.http
      .post(this.personUrl, JSON.stringify(person))
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
