import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule }            from '@angular/forms';
import { Observable }             from 'rxjs';
import { UUID }                   from 'angular2-uuid';
import { Location }               from '@angular/common';
import * as moment                from 'moment';
import { Logger }                 from 'angular2-logger/core';

import 'rxjs/add/operator/switchMap';

import { Animal, Name, Birth, Constants } from './../../../core/models';
import { AnimalService } from './../../../core/services';
import { ConstantsService } from './../../../core/services';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal = <Animal>{ name: {}, birth: {}, species: 'horse' };
  //animal = new Animal();
  constBreeds: [{}];
  constGenders: [{}];
  constColours: [{}];
  constActivities: [{}];
  constants: Constants[];
  age: number;
  private id;
  private isNewAnimal: boolean = true;
  private isReadOnly: boolean = true;
  private hideForm: boolean = false;

  constructor(
    private _logger: Logger,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private constantsService: ConstantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getConstants();
    // Logic to decide if a 'new'/create animal or if a view/edit of existing animal
    // by url?/params? => ID=null||new
    this.getId();
    //this.getAnimal();
  }

  getConstants() {
    this.constantsService.getConstants()
      .subscribe(consts => {
        this.constants = consts;
        this.constBreeds = this.constants[0].breeds;
        this.constGenders = this.constants[0].genders;
        this.constColours = this.constants[0].colours;
        this.constActivities = this.constants[0].activities;
        this._logger.debug('constants: ', this.constants);
      });
  }

  getAnimal(): void {
    this.route.params
      .switchMap((p: Params) => this.animalService.getAnimal(p['id']))
      .subscribe(a => {
        this.animal = a;
        this.calculateAge();
        this._logger.debug('animal: ', this.animal);
        this._logger.debug('age: ', this.age);
      });
  }

  calculateAge(): void {
    if (this.animal.birth.date) {
      this.age = Math.floor((Date.now() - new Date(this.animal.birth.date).getTime()) / 31556952000);
    }
  }

  calculateBirthDate(yrs: number): string {
    let now = moment();
    this._logger.debug('moment: ', now);
    let birth = moment().subtract(yrs, 'years');
    this._logger.debug('birth: ', birth.format);
    return birth.format();
  }

  getId(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];// || null;
      this._logger.debug('id: ', this.id);
      if (this.id != null) {
        this.isNewAnimal = false;
        this._logger.debug('New? ', this.isNewAnimal);
        this.getAnimal();
      }
      else {
        this._logger.debug('New? ', this.isNewAnimal);
        this.newAnimal();
        this._logger.debug('Blank Animal: ', this.animal);
      }
    })
  }

  newAnimal(): void {
    this._logger.debug('Creating blank animal');
    //this.animal = new Animal('',null, '', '', '', '', '', null, null, '', '', '', null);
    this.animal.patient_since = new Date();
    this.isReadOnly = false;

  }

  cancelEdit() {
    this.getAnimal();
    this.toggleReadOnly();
  }

  saveAnimal({ value, valid }: { value: any, valid: boolean }) {
    // Read form values
    this._logger.debug('Form Animal: ', value);
    this._logger.debug('Valid? ', valid);
    this._logger.debug('Form Activity: ', value.activity);
    this._logger.debug('Form Age: ', value.age);
    this.animal.birth.date = new Date(this.calculateBirthDate(value.age));
    if (!this.animal.name.full) this.animal.name.full = this.animal.name.display;

    if (this.isNewAnimal) {
      this._logger.debug('Create call');
      // Following needed in dev state for in-memory API
      this.animal.patient_since = new Date();
      this.animal.id = UUID.UUID();
      // Set full to display if not set

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

  goBack() {
    this._logger.debug('TODO Naviagate back');
    this.location.back();
  }

  toggleReadOnly() { this.isReadOnly = !this.isReadOnly }
  toggleHideForm() { this.hideForm = !this.hideForm }

}
