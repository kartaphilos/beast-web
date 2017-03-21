export interface Location {
  _id: string;
  location_since: Date;
  loctype: 'string';
  name: 'string';
  number: 'string';
  street: 'string';
  city: 'string';
  county: 'string';
  postcode: 'string';
  country: 'string'
  coordinates: CoOrdinates;
}

export interface CoOrdinates {
  lat: 'string';
  long: 'string';
}
