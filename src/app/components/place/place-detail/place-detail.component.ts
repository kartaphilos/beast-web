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
import { Place, CoOrdinates, PlaceConstants } from './../../../core/models';
import { PlaceService } from './../../../core/services';
import { ConstantsService } from './../../../core/services';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {

  private constants: PlaceConstants;
  private mapZoom: number = 11;
  place: Place = <Place>{ coordinates: {}, country: 'GB' };
  private id: string;
  private isNewPlace: boolean = true;
  private isReadOnly: boolean = true;

  constructor(
    private _logger: Logger,
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private constantsService: ConstantsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getConstants();
    this.setNewOrExisting();
  }

  getConstants() {
    this.constantsService.getPlaceConstants()
      .subscribe(consts => {
        this.constants = consts[0]; // Come back as array
        this._logger.debug('constants: ', this.constants);
      });
  }

  setNewOrExisting(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];// || null;
      this._logger.debug('id: ', this.id);
      if (this.id) {
        this.isNewPlace = false;
        this._logger.debug('New? ', this.isNewPlace);
        this.getPlace();
      }
      else {
        this.isNewPlace = true;
        this._logger.debug('New? ', this.isNewPlace);
        this.isReadOnly = false; //No need to readonly view a blank place
        this._logger.debug('Blank Place: ', this.place);
      }
    })
  }

  getPlace(): void {  //TODO: add error checking to catch for bad id
    this.route.params
      .switchMap((p: Params) => this.placeService.getPlace(p['id']))
      .subscribe(a => {
        this.place = a;
        this._logger.debug('place: ', this.place);
      });
  }

  savePlace({ value, valid }: { value: any, valid: boolean }) {
    this._logger.debug('Form Place: ', value);
    if (this.isNewPlace) {
      this._logger.debug('Create call');
      if (!this.place.since) this.place.since = new Date(); // If blank date default to now
      this.place.id = UUID.UUID();
      this._logger.debug('UUID: ', this.place.id);
      this._logger.debug('New Place: ', this.place);
      this.placeService.create(this.place)
        .then(() => this.goBack());
    }
    else {
      this._logger.debug('Update call');
      this.placeService.update(this.place)
        .then(() => this.goBack());
    }
  }

  cancelEdit() {
    this.getPlace();
    this.toggleReadOnly();
  }

  goBack() {
    this.location.back();
  }

  // Toggle functions for variables
  toggleReadOnly() { this.isReadOnly = !this.isReadOnly }

}
