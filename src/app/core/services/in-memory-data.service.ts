import { InMemoryDbService }	from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {  //ToDo - Can I return multiple doc types?  or do I need an InMem service for each doc type?
    let animal = [  // <- This variable is the url -> /api/animal
      {
        "patient_since": "2016-01-01T17:12:10.381Z",
        "name": {
          "full": "Stampy of Hoofy",
          "display": "Stampy"
        },
        "birth": {
          "estimated": "true",
          "date": "2010-01-01T17:12:10.380Z"
        },
        "id": "0cce5d55-d292-4a21-8ca9-2895ee81f774",
        "species": "horse",
        "breed": "Shire",
        "colour": "White",
        "size": "15.1",
        "activity": "Eventing",
        "gender": "Stallion"
      },
      {
        "patient_since": "2013-01-01T00:00:00.000Z",
        "name": {
          "full": "Canty1 Canterer",
          "display": "Canty1"
        },
        "birth": {
          "estimated": "true",
          "date": "2006-02-18T13:43:09.707Z"
        },
        "id": "0d825cac-5756-4388-a243-542e1db78216",
        "breed": "Nag",
        "colour": "Chestnut",
        "size": "16.1",
        "activity": "Eating",
        "gender": "Mare"
      },
      {
        "patient_since": "2017-02-21T17:12:10.381Z",
        "name": {
          "display": "yappy",
          "full": "yappy for search test"
        },
        "birth": {
          "estimated": "true",
          "date": "2013-02-21T17:12:10.380Z"
        },
        "id": "0ffe8d77-d292-4a21-8ca9-2895ee81f774",
        "species": "horse",
        "breed": "Arab",
        "colour": "Palomino",
        "size": "15.2",
        "activity": "Hacking",
        "gender": "Gelding"
      },
      {
        "patient_since": "2015-02-21T17:12:10.381Z",
        "name": {
          "full": "Neigh Neigh Munch",
          "display": "Neigh"
        },
        "birth": {
          "estimated": "true",
          "date": "2013-02-21T17:12:10.380Z"
        },
        "id": "0bbe8d88-d292-4a21-8ca9-2895ee81f774",
        "species": "horse",
        "breed": "Cob",
        "colour": "Grey",
        "size": "14.1",
        "activity": "Eating",
        "gender": "Mare"
      }
    ];

    let constants = [
      {
        'breeds': [
          { 'value': 'Luisitano' },
          { 'value': 'nag' },
          { 'value': 'Arab' },
          { 'value': 'Cob' },
          { 'value': 'Shire' },
          { 'value': 'Thoroughbred' },
          { 'value': 'Andalusian' },
          { 'value': 'Trakehner' },
          { 'value': 'Dutch Warmblood' },
          { 'value': 'Glue Factory' },
        ],
        'genders': [
          { 'value': 'Mare' },
          { 'value': 'Gelding' },
          { 'value': 'Stallion' },
        ],
        'colours': [
          { 'value': 'Bay' },
          { 'value': 'Chestnut' },
          { 'value': 'Dun' },
          { 'value': 'Grey' },
          { 'value': 'Palomino' },
          { 'value': 'Black' },
          { 'value': 'White' },
        ],
        'activities': [
          { 'value': 'Jumping' },
          { 'value': 'Hacking' },
          { 'value': 'Dressage' },
          { 'value': 'Eventing' },
          { 'value': 'Eating' },
          { 'value': 'Glue Making' },
        ]
      }
    ];

    let location = [
      {
        "_id": "a3c41465-7226-4cbe-93a0-78448cb29535",
        "since": "2017-03-21T15:09:20+00:00Z",
        "type": "yard",
        "name": "Cow City Livery",
        "number": "",
        "street": "Church Lane, Farley Hill",
        "city": "Reading",
        "county": "Berkshire",
        "postcode": "RG7 1UP",
        "country": "GB",
        "coordinates": {
          "lat": "51.376520",
          "long": "-0.916006"
        }
      },
      {
        "_id": "9821fe66-0d85-41b1-8447-025540cb0dfb",
        "since": "2003-02-21T17:12:10.380Z",
        "type": "house",
        "name": "",
        "number": "121",
        "street": "Clarence Rd",
        "city": "Fleet",
        "county": "Hampshire",
        "postcode": "GU513RS",
        "country": "GB",
        "coordinates": {
          "lat": "51.279224",
          "long": "-0.840605"
        }
      },
      {
        "_id": "dc09da2a-d5e4-41f2-893c-4d4c2cfcb2f9",
        "since": "2006-02-18T13:43:09.707Z",
        "type": "yard",
        "name": "Pilcot Farm",
        "number": "",
        "street": "Pilcot",
        "city": "Dogmersfield",
        "county": "Hampshire",
        "postcode": "RG27 8ST",
        "country": "GB",
        "coordinates": {
          "lat": "51.271957",
          "long": "-0.874162"
        }
      },

    ];

    return { animal, constants, location };
  }
}
