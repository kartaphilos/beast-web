import { InMemoryDbService }	from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {  //ToDo - Can I return multiple doc types?  or do I need an InMem service for each doc type?
    let animal = [  // <- This variable is the url -> /api/animal
      //TODO: read json from a file
    {
      "patient_since": "2016-01-01T17:12:10.381Z",
      "name": {
        "full": "Stampy",
        "display": "Stampy of Hoof"
      },
      "birth": {
        "estimated": "true",
        "date": "2010-01-01T17:12:10.380Z"
      },
      "id": "0cce5d55-d292-4a21-8ca9-2895ee81f774",
      "species": "horse",
      "breed": "Shire",
      "colour": "grey",
      "size": "15.1h",
      "activity": "winning",
      "gender": "Stallion"
    },
      {
        "name": {
          "full": "Canty1 Canterer",
          "display": "Canty1"
        },
        "birth": {
          "estimated": "true",
          "date": "2006-02-18T13:43:09.707Z"
        },
        "id": "0d825cac-5756-4388-a243-542e1db78216",
        "breed": "nag",
        "colour": "chestnut",
        "size": "16.1h",
        "activity": "eating",
        "gender": "mare"
      },
      {
        "patient_since": "2017-02-21T17:12:10.381Z",
        "name": {
          "full": "yappy",
          "display": "yappy for search test"
        },
        "birth": {
          "estimated": "true",
          "date": "2013-02-21T17:12:10.380Z"
        },
        "id": "0ffe8d77-d292-4a21-8ca9-2895ee81f774",
        "species": "horse",
        "breed": "Arab",
        "colour": "grey",
        "size": "15.1h",
        "activity": "winning",
        "gender": "gelding"
      },
      {
        "patient_since": "2015-02-21T17:12:10.381Z",
        "name": {
          "full": "Neigh",
          "display": "Neigh Neigh"
        },
        "birth": {
          "estimated": "true",
          "date": "2013-02-21T17:12:10.380Z"
        },
        "id": "0bbe8d88-d292-4a21-8ca9-2895ee81f774",
        "species": "horse",
        "breed": "Cob",
        "colour": "grey",
        "size": "15.1h",
        "activity": "winning",
        "gender": "Mare"
      }
    ];
    return { animal };
  }
}
