import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
    private animalService: AnimalService
  ) {};

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
    this.router.navigate(['/animal/detail', animal.id]);
  }

  createAnimal(): void {
    this.router.navigate(['/animal/detail/']);
  }

  add(animal: Animal): void {
    if (!animal) { return; }
    this.animalService.create(animal)
      .then(a => {
        this.animals.push(a);
        this.selectedAnimal = null;
      });
  }

  create(): void { // Function not used?  
    this.router.navigate(['/animal/detail']);
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
