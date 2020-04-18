import { Ingredient } from './ingredient';

export interface Recipe {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
}
