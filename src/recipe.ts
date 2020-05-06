import { Ingredient } from './ingredient';
import {Directions} from './directions';

export interface Recipe {
  id: number;
  title: string;
  directions: Directions[];
  ingredients: Ingredient[];
}
