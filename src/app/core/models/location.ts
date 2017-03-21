export interface Location {
  _id: 'string';
  location_since: Date;
  type: 'string';
  name: 'string';
  number: 'string';
  street: 'string';
  city: 'string';
  county: 'string'; //Autocomplete would be nice
  postcode: 'string';
  country: 'string';  //Autocomplete would be nice
  coordinates: CoOrdinates;
}

export interface CoOrdinates {
  lat: 'number';
  long: 'number';
}
