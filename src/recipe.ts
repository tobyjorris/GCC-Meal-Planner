import { Ingredient } from './ingredient';
import {Directions} from './directions';

export interface Recipe {
  title: string;
  directions: Directions[];
  ingredients: Ingredient[];
}
