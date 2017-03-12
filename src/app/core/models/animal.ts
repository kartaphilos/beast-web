export class Animal {
	id: string;
	patient_since: Date;
  species: string; // Horse, Dog
  name: {
      full: string,
      display: string
  };
  breed: string;
  colour: string;
  birth: {
      date: Date,
      estimated: boolean
  };
  size: string;
  activity: string;
  gender: string;
  flagged: boolean;
}
