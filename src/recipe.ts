import { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  title: string;
  instructions: string;
  ingredients: Ingredient[];
}
