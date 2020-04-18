import { Recipe } from '../recipe';

export const RECIPES: Recipe[] = [
  { title: 'White Chicken Chili',
    instructions: 'Crock-pot for 8 hours',
    ingredients: [
      {quantity: 3, name: 'Chicken'},
      {quantity: 1, name: 'Beans'},
      {quantity: 1, name: 'Tomatoes'},
      {quantity: 2, name: 'Cream'},
      {quantity: 4, name: 'Cheese'},
    ],
  },
  { title: 'Turkey Meatballs',
    instructions: 'Cook in oven at 375 degrees for 4.5 - 5.0 hours',
    ingredients: [
      {quantity: 8, name: 'Ground Turkey'},
      {quantity: 5, name: 'BBQ Sauce'},
      {quantity: 2, name: 'Onion Powder'},
      {quantity: 2, name: 'Eggs'},
    ],
  },
  { title: 'Steak On The Grill',
    instructions: 'Grill over high heat for 3 minutes each side',
    ingredients: [
      {quantity: 1, name: 'Steak'},
      {quantity: 2, name: 'Salt'},
      {quantity: 2, name: 'Pepper'},
    ],
  },
];


