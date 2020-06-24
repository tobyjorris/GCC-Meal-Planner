import { Ingredient } from './ingredient';
import { Directions } from './directions';

export interface Recipe {
  multi: number;
  id: string;
  cost: number;
  credit: string;
  accommodations: [{type: string, comment: string}];
  proteinBase: string;
  cookingMethod: string;
  title: string;
  prepDirections: Directions[];
  cookDirections: Directions[];
  chefNotes: string;
  ingredients: Ingredient[];
}
