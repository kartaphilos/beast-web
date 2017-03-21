import { Injectable } from '@angular/core';
import { Headers, Http }	from '@angular/http';
import { Logger }         from 'angular2-logger/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Constants } from './../models';

@Injectable()
export class ConstantsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private constantsUrl = 'api/constants';
  private breedsUrl = 'api/breeds';


  // TODO: Put this into a config file for switching to InMemory vs real API
  // TODO: (later later) - Boot up tests to check API ok

  constructor(
    private _logger: Logger,
    private http: Http
  ) { }

  getBreeds(): Observable<any> {  // 'any' OR '[{}]' both work.
    const url = this.breedsUrl;
    this._logger.debug('Breeds url: ', url);
    return this.http.get(url)
      .map(response => response.json().data )
      .catch(this.handleError);
  }

  getConstants(): Observable<Constants> {
    const url = this.constantsUrl;
    this._logger.debug('Constants url: ', url);
    return this.http.get(url)
      .map(response => response.json().data )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
