export interface Animal {
  id: string;
  patient_since: Date;
  species: string; // Horse, Dog
  name: Name;
  breed: string;
  colour: string;
  birth: Birth;
  size: string;
  activity: string;
  gender: string;
  flagged: boolean;
}

export interface Name {
  full: string,
  display: string
}

export interface Birth {
	date: Date,
	estimated: boolean
}
