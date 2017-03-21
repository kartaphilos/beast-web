import { Component, OnInit }      from '@angular/core';
import { Router }                 from '@angular/router';
import { Logger }                 from 'angular2-logger/core';

import { Place, CoOrdinates } from './../../../core/models';
import { PlaceService } from './../../../core/services';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  places: Place[];
  selectedPlace: Place;
  selectedDialogOption: string;

  constructor(
    private _logger: Logger,
    private router: Router,
    private placeService: PlaceService
  ) {};

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .then(places => this.places = places);
  }

  onSelect(place: Place): void {
    this.selectedPlace = place;
  }

  gotoDetail(place: Place): void {
    this.router.navigate(['/place/detail', place._id]);
  }

  add(place: Place): void {
    if (!place) { return; }
    this.placeService.create(place)
      .then(a => {
        this.places.push(a);
        this.selectedPlace = null;
      });
  }

  create(): void {
    this.router.navigate(['/place/detail/']);
  }


}
