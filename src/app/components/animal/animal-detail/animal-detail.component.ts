import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Animal, Constants } from './../../../core/models';
//import { Constants } from './../../../core/models';
import { AnimalService } from './../../../core/services';
import { ConstantsService } from './../../../core/services';


@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal;
  constBreeds: [{}];
  constGenders: [{}];
  constColours: [{}];
  constActivities: [{}];
  constants: Constants[];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private constantsService: ConstantsService
  ) { }

  ngOnInit(): void {
    this.getConstants();
    this.route.params
      .switchMap((params: Params) => this.animalService.getAnimal(params['id']))
      .subscribe(animal => {
        this.animal = animal;
        console.log('animal: ', this.animal);
        console.log('animal gender: ', this.animal.gender);
      });
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
      })

  }

}
