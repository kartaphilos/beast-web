import { Component, OnInit }      from '@angular/core';
import { Router }                 from '@angular/router';
import { Logger }                 from 'angular2-logger/core';

import { Location, CoOrdinates } from './../../../core/models';
import { LocationService } from './../../../core/services';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  locations: Location[];
  selectedLocation: Location;
  selectedDialogOption: string;

  constructor(
    private _logger: Logger,
    private router: Router,
    private locationService: LocationService
  ) {};

  ngOnInit() {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getLocations()
      .then(locations => this.locations = locations);
  }

  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

  gotoDetail(location: Location): void {
    this.router.navigate(['/location/detail', location._id]);
  }

  add(location: Location): void {
    if (!location) { return; }
    this.locationService.create(location)
      .then(a => {
        this.locations.push(a);
        this.selectedLocation = null;
      });
  }

  create(): void {
    this.router.navigate(['/location/detail/']);
  }


}
