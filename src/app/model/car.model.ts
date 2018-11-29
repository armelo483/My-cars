export class Car {
  photo: string;
  description: string;
  prix: number;
  marque: string;
  
  constructor(public description: string, public prix: string, public marque: string) {
	  this.description = description;
	  this.prix = prix;
	  this.marque = marque;
  }
}