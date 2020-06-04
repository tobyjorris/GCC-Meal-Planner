import { Ingredient } from './ingredient';
import {Directions} from './directions';

export interface Recipe {
  multi: number;
  id: string;
  title: string;
  directions: Directions[];
  ingredients: Ingredient[];
}
