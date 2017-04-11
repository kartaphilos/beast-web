/**
This model is an amalgam of DB model and Google model.
This model in app populated with all data needed...
.... But only things not stored in Google contacts are persisted in DB
**/
export interface Person {
  // Stored in DB
  id: string,   // My DB reference
  source: string, //Google or ??
  source_id: string, // Google or ?? key
  person_since: Date,
  // Popiulated from Goog
  name: PersonName,
  avatarUrl: string,
  gender: string,
}

export interface PersonName {
  given: string,
  family: string,
  display: string
}
