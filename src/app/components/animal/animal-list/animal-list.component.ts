import { Component, OnInit }      from '@angular/core';
import { Router }                 from '@angular/router';
import { Logger }                 from 'angular2-logger/core';

import { Animal } from './../../../core/models';
import { AnimalService } from './../../../core/services';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animals: Animal[];
  selectedAnimal: Animal;
  selectedDialogOption: string;

  constructor(
    private _logger: Logger,
    private router: Router,
    private animalService: AnimalService
  ) { };

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .then(animals => this.animals = animals);
  }

  onSelect(animal: Animal): void {
    this.selectedAnimal = animal;
  }

  gotoDetail(animal: Animal): void {
    this._logger.debug('place_id: ', animal.id);
    this.router.navigate(['/animal/detail', animal.id]);
  }

  add(animal: Animal): void {
    if (!animal) { return; }
    this.animalService.create(animal)
      .then(a => {
        this.animals.push(a);
        this.selectedAnimal = null;
      });
  }

  create(): void {
    this.router.navigate(['/animal/detail/']);
  }

  delete(animal: Animal): void {
    this.animalService
      .delete(animal.id)
      .then(() => {
        this.animals = this.animals.filter(h => h !== animal);
        if (this.selectedAnimal === animal) {
          this.selectedAnimal == null;
        }
      });
  }

}
