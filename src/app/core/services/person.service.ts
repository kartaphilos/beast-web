import { Injectable }     from '@angular/core';
import { Headers, Http, Response }	from '@angular/http';
import { Logger }					from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

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

  getPersons(): Observable<Person[]> {  // Gets all contacts in two calls to avoid iterating individual goog calls
    this._logger.debug('Person Service - getPersons()');
    let persons$ = Observable.forkJoin([
      this.http.get(this.personUrl).map(this.mapPersons.bind(this)),
      this.googleService.getUsersConnections()
    ])
      .map((data: any[]) => {
        // Combine arrays together by key...
        const combined = data[0].map((p: Person) => {
          return Object.assign({}, p, data[1].filter((g: Person) => g.id === p.id )[0]);
          /*{
            this._logger.debug('p.id: ', p.id);
            this._logger.debug('g.id: ', g.id);
            let goog = g.id.replace('people/','')
            this._logger.debug('g.id.replace(): ', goog );
            goog === p.id;
          } */

      });
        this._logger.debug('Combined contacts: ', combined);
        return combined;
      })
      .catch(this.handleError);
    return persons$;
  }

  getPerson(id: string): Observable<Person> {
    this._logger.debug('Person Service - getPerson(id): ', id);
    let person$ = this.http.get(`${this.personUrl}/${id}`)
      .map(this.mapPerson.bind(this))
      .mergeMap((p: Person) => {
          this._logger.debug('p.id: ',p.id);
          this._logger.debug('func param id: ', id);
          return this.googleService.getContact(p.id);
        })
      .map(this.mapPerson.bind(this))
      .catch(this.handleError);
      this._logger.debug('getPerson - person$: ', person$)
    return person$;

    // Use mergeMap to combine both calls
    // get google person from source_id
    // Use destructuring (or 'pick')to pick out fields from google object to add to person object
  }

  mapPerson(response: Response): Person {
    let person = response.json().data as Person; // why can't I do this 1-liner inline in the get Person?
    this._logger.debug('mapPerson: ', person);
    return person;
  }

  mapPersons(response: Response): Person[] {
    let persons = response.json().data as Person[];
    //this._logger.debug('mapPersons: ', persons);
    return persons; //.map(toPerson)
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


  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
