import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule }            from '@angular/forms';
import { Observable }             from 'rxjs';
import { UUID }                   from 'angular2-uuid';
import { Location }               from '@angular/common';
import * as moment                from 'moment';
import { Logger }                 from 'angular2-logger/core';
import 'rxjs/add/operator/switchMap';

// My Stuff
import { Person, PersonName } from './../../../core/models';
import { PersonService } from './../../../core/services';
import { ConstantsService } from './../../../core/services';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
person: Person = <Person>{ name: {}, source: 'google' };
private age: number;
private id: string;
private isNewPerson: boolean = true;
private isReadOnly: boolean = true;
private hideForm: boolean = true;

  constructor(
    private _logger: Logger,
    private route: ActivatedRoute,
    private personService: PersonService,
    private constantsService: ConstantsService,
    private location: Location
  ) {
   }

  ngOnInit() {
    this.setNewOrExistingPerson();
  }

setNewOrExistingPerson(): void {
  this.route.params.subscribe(params => {
    this.id = params['id'];// || null;
    this._logger.debug('id: ', this.id);
    if (this.id) {
      this.isNewPerson = false;
      this._logger.debug('New? ', this.isNewPerson);
      this.getPerson();
    }
    else {
      this.isNewPerson = true;
      this._logger.debug('New? ', this.isNewPerson);
      this.isReadOnly = false; //No need to readonly view a blank person
      this._logger.debug('Blank Person: ', this.person);
    }
  })
}

getPerson(): void {  //TODO: add error checking to catch for bad id
  this._logger.debug('Person Detail - getPerson(): ');
  this.route.params
    .switchMap((p: Params) => this.personService.getPerson(p['id']))
    .subscribe(a => {
      this.person = a;
      this._logger.debug('person: ', this.person);
    });
}

savePerson({ value, valid }: { value: any, valid: boolean }) {
  this._logger.debug('Form Person: ', value);
  //this.person.birth.date = new Date(this.calculateBirthDate(value.age));
  //if (!this.person.name.full) this.person.name.full = this.person.name.display;
  if (this.isNewPerson) {
    this._logger.debug('Create call');
    if (!this.person.since) this.person.since = new Date(); // If blank date default to now
    this.person.id = UUID.UUID();
    this._logger.debug('UUID: ', this.person.id);
    this._logger.debug('New Person: ', this.person);
    this.personService.create(this.person)
      .then(() => this.goBack());
  }
  else {
    this._logger.debug('Update call');
    this.personService.update(this.person)
      .then(() => this.goBack());
  }
}

cancelEdit() {
  this.getPerson();
  this.toggleReadOnly();
}

/*calculateAge(): void {
  if (this.person.birth.date) {
    this.age = Math.floor((Date.now() - new Date(this.person.birth.date).getTime()) / 31556952000);
  }
}
*/

calculateBirthDate(years: number): string {
  let now = moment();
  let birth = moment().subtract(years, 'years');
  return birth.format();
}

goBack() { this.location.back() }

// Toggle functions for variables
toggleReadOnly() { this.isReadOnly = !this.isReadOnly }
toggleHideForm() { this.hideForm = !this.hideForm }

}
