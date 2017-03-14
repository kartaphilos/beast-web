import { Injectable } from '@angular/core';
import { Headers, Http }	from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Animal } from './../models';

@Injectable()
export class AnimalService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private animalsUrl = 'api/animal';
	// private animalsURl = 'http://localhost:8081/animal'
	// TODO: Put this into a config file for switching to InMemory vs real API
	// TODO: (later later) - Boot up tests to check API ok

	constructor(private http: Http) { }

	getAnimals(): Promise<Animal[]> {
	    return this.http.get(this.animalsUrl)
		.toPromise()
		.then(response => response.json().data as Animal[])
		.catch(this.handleError);
	}

	getAnimal(id: number): Promise<Animal> {
		const url = `${this.animalsUrl}/${id}`;
		console.log('animal url: ', url);
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Animal)
			.catch(this.handleError);
	}

	update(animal: Animal): Promise<Animal> {
		const url = `${this.animalsUrl}/${animal.id}`;
		return this.http
			.put(url, JSON.stringify(animal), {headers: this.headers})
			.toPromise()
			.then( () => animal)
			.catch(this.handleError);
	}

	create(name: string): Promise<Animal> {
		return this.http
			.post(this.animalsUrl, JSON.stringify({name: name}), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.animalsUrl}/${id}`;
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
