import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule }            from '@angular/forms';
import { Observable }             from 'rxjs';
import { UUID }                   from 'angular2-uuid';
import { Location }               from '@angular/common';
import * as moment                from 'moment';
import { Logger }                 from 'angular2-logger/core';
import 'rxjs/add/operator/switchMap';

// My Stuff
import { Animal, Name, Birth, AnimalConstants } from './../../../core/models';
import { AnimalService } from './../../../core/services';
import { ConstantsService } from './../../../core/services';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  constants: AnimalConstants;
  animal: Animal = <Animal>{ name: {}, birth: {}, species: 'horse' };
  private age: number;
  private id: string;
  private isNewAnimal: boolean = true;
  private isReadOnly: boolean = true;
  private hideForm: boolean = true;

  constructor(
    private _logger: Logger,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private constantsService: ConstantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getConstants();
    this.setNewOrExistingAnimal();
  }

  getConstants() {
    this.constantsService.getAnimalConstants()
      .subscribe(consts => {
        this.constants = consts[0]; // Come back as array
        this._logger.debug('constants: ', this.constants);
        this._logger.debug('constants[0].breeds: ', this.constants.breeds);
      });
  }

  setNewOrExistingAnimal(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];// || null;
      this._logger.debug('id: ', this.id);
      if (this.id) {
        this.isNewAnimal = false;
        this._logger.debug('New? ', this.isNewAnimal);
        this.getAnimal();
      }
      else {
        this.isNewAnimal = true;
        this._logger.debug('New? ', this.isNewAnimal);
        this.isReadOnly = false; //No need to readonly view a blank animal
        this._logger.debug('Blank Animal: ', this.animal);
      }
    })
  }

  getAnimal(): void {  //TODO: add error checking to catch for bad id
    this.route.params
      .switchMap((p: Params) => this.animalService.getAnimal(p['id']))
      .subscribe(a => {
        this.animal = a;
        this._logger.debug('animal: ', this.animal);
        this.calculateAge();
        this._logger.debug('age: ', this.age);
      });
  }

  saveAnimal({ value, valid }: { value: any, valid: boolean }) {
    this._logger.debug('Form Animal: ', value);
    this.animal.birth.date = new Date(this.calculateBirthDate(value.age));
    if (!this.animal.name.full) this.animal.name.full = this.animal.name.display;
    if (this.isNewAnimal) {
      this._logger.debug('Create call');
      if (!this.animal.patient_since) this.animal.patient_since = new Date(); // If blank date default to now
      this.animal.id = UUID.UUID();
      this._logger.debug('UUID: ', this.animal.id);
      this._logger.debug('New Animal: ', this.animal);
      this.animalService.create(this.animal)
        .then(() => this.goBack());
    }
    else {
      this._logger.debug('Update call');
      this.animalService.update(this.animal)
        .then(() => this.goBack());
    }
  }

  cancelEdit() {
    this.getAnimal();
    this.toggleReadOnly();
  }

  calculateAge(): void {
    if (this.animal.birth.date) {
      this.age = Math.floor((Date.now() - new Date(this.animal.birth.date).getTime()) / 31556952000);
    }
  }

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
