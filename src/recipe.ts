import { Ingredient } from './ingredient';
import {Directions} from './directions';

export interface Recipe {
  id: string;
  title: string;
  directions: Directions[];
  ingredients: Ingredient[];
}
