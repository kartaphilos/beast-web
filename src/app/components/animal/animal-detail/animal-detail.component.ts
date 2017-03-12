import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Animal } from './../../../core/models';
import { AnimalService } from './../../../core/services';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal;

  breeds = [ //TODO: Put these in DB
    { value: 'Luisitano' },
    { value: 'Arab' },
    { value: 'Cob' },
    { value: 'Shire' },
    { value: 'Thoroughbred' },
    { value: 'Andalusian' },
    { value: 'Trakehner' },
    { value: 'Dutch Warmblood' },
    { value: 'Glue Factory' },
  ];
  genders = [
    { value: 'Mare' },
    { value: 'Gelding' },
    { value: 'Stallion' },
  ];
  colours = [
    { value: 'Bay' },
    { value: 'Chestnut' },
    { value: 'Dun' },
    { value: 'Grey' },
    { value: 'Palomino' },
    { value: 'Black' },
    { value: 'White' },
  ];

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) { }

  ngOnInit(): void {
    //console.log('id: ', this.route.params['id']);
    this.route.params
      .switchMap((params: Params) => this.animalService.getAnimal(params['id']))
      .subscribe(animal => this.animal = animal);
    console.log('animal: ', JSON.stringify(this.animal));  
  }


}
