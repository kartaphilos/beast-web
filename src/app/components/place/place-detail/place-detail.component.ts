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

  placeConstants: PlaceConstants;
  place: Place = <Place>{ coordinates: {}, country: 'GB' };
  private _id: string;
  private isNewPlace: boolean = true;
  private isReadOnly: boolean = true;

  constructor(
    private _logger: Logger,
    private route: ActivatedRoute,
    private PlaceService: PlaceService,
    private constantsService: ConstantsService,
    private location: Location
  ) { }

  ngOnInit() {
  }

}
