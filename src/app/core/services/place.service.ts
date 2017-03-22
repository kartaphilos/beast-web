import { Injectable } from '@angular/core';
import { Headers, Http }	from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Logger }					from 'angular2-logger/core';

import { Place } from './../models';

@Injectable()
export class PlaceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private placeUrl = 'api/place';

  constructor(
			private _logger: Logger,
			private http: Http
		) { }

    getPlaces(): Promise<Place[]> {
  	    return this.http.get(this.placeUrl)
  		.toPromise()
  		.then(response => response.json().data as Place[])
  		.catch(this.handleError);
  	}

  	getPlace(id: string): Promise<Place> {
  		const url = `${this.placeUrl}/${id}`;
  		this._logger.debug('place url: ', url);
  		return this.http.get(url)
  			.toPromise()
  			.then(response => response.json().data as Place)
  			.catch(this.handleError);
  	}

  	update(place: Place): Promise<Place> {
  		const url = `${this.placeUrl}/${place.id}`;
  		return this.http
  			.put(url, JSON.stringify(place), {headers: this.headers})
  			.toPromise()
  			.then( () => place)
  			.catch(this.handleError);
  	}

  	create(place: Place): Promise<Place> {
  		return this.http
  			.post(this.placeUrl, JSON.stringify(place))
  			.toPromise()
  			.then(res => res.json().data)
  			.catch(this.handleError);
  	}

  	delete(id: string): Promise<void> {
  		const url = `${this.placeUrl}/${id}`;
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
