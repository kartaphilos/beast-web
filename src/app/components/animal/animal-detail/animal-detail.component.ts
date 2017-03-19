import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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
  private id;
  private isNewAnimal: boolean = true;
  private isReadOnly: boolean = true;
  private hideForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private constantsService: ConstantsService
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
        console.log('constants: ', this.constants);
      });
  }

  getAnimal(): void {
    this.route.params
      .switchMap((p: Params) => this.animalService.getAnimal(p['id']))
      .subscribe(a => {
        this.animal = a;
        console.log('animal: ', this.animal);
      });
  }

  getId(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];// || null;
      console.log('id: ', this.id);
      if (this.id != null) {
        this.isNewAnimal = false;
        console.log('New? ', this.isNewAnimal);
        this.getAnimal();
      }
      else {
        console.log('New? ', this.isNewAnimal);
        this.newAnimal();
        console.log('Blank Animal: ', this.animal);
      }
    })
  }

  newAnimal(): void {
    console.log('Creating blank animal');
    //this.animal = new Animal('',null, '', '', '', '', '', null, null, '', '', '', null);
    this.animal.birth.date = new Date();

  }


  cancelEdit() {
    this.getAnimal();
    this.toggleReadOnly();
  }

  saveAnimal() {
    // Read form values
    // Compare to original animal state.  If differences make API call with update/create
    // if save required:- if original ID is null then a POST (ie create) otherwise PUT (ie. update)
  }

  toggleReadOnly() { this.isReadOnly = !this.isReadOnly }
  toggleHideForm() { this.hideForm = !this.hideForm }

}
