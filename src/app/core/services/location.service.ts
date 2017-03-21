import { Injectable } from '@angular/core';
import { Headers, Http }	from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Logger }					from 'angular2-logger/core';

import { Location } from './../models';

@Injectable()
export class LocationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private locationUrl = 'api/location';

  constructor(
			private _logger: Logger,
			private http: Http
		) { }

    getLocations(): Promise<Location[]> {
  	    return this.http.get(this.locationUrl)
  		.toPromise()
  		.then(response => response.json().data as Location[])
  		.catch(this.handleError);
  	}

  	getLocation(id: number): Promise<Location> {
  		const url = `${this.locationUrl}/${id}`;
  		this._logger.debug('location url: ', url);
  		return this.http.get(url)
  			.toPromise()
  			.then(response => response.json().data as Location)
  			.catch(this.handleError);
  	}

  	update(location: Location): Promise<Location> {
  		const url = `${this.locationUrl}/${location._id}`;
  		return this.http
  			.put(url, JSON.stringify(location), {headers: this.headers})
  			.toPromise()
  			.then( () => location)
  			.catch(this.handleError);
  	}

  	create(location: Location): Promise<Location> {
  		return this.http
  			.post(this.locationUrl, JSON.stringify(location))
  			.toPromise()
  			.then(res => res.json().data)
  			.catch(this.handleError);
  	}

  	delete(id: string): Promise<void> {
  		const url = `${this.locationUrl}/${id}`;
  		return this.http.delete(url, {headers: this.headers})
  			.toPromise()
  			.then( () => null)
  			.catch(this.handleError);
  	}

  	private handleError(error: any): Promise<any> {
  		console.error('An error occurred', error);
  		return Promise.reject(error.message || error);
  	}
}
