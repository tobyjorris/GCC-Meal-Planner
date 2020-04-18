import { Recipe } from '../recipe';

export const RECIPES: Recipe[] = [
  { title: 'White Chicken Chili',
    instructions: 'Crock-pot for 8 hours',
    ingredients: [
      {quantity: 2, name: 'Chicken'},
      {quantity: 2, name: 'Beans'},
      {quantity: 2, name: 'Tomatoes'},
      {quantity: 2, name: 'Cream'},
      {quantity: 2, name: 'Cheese'},
    ],
  },
  { title: 'Turkey Meatballs',
    instructions: 'Cook in oven at 375 degrees for 4.5 - 5.0 hours',
    ingredients: [
      {quantity: 2, name: 'Ground Turkey'},
      {quantity: 2, name: 'BBQ Sauce'},
      {quantity: 2, name: 'Onion Powder'},
      {quantity: 2, name: 'Eggs'},
    ],
  },
  { title: 'Steak On The Grill',
    instructions: 'Grill over high heat for 3 minutes each side',
    ingredients: [
      {quantity: 2, name: 'Steak'},
      {quantity: 2, name: 'Crushed Garlic'},
      {quantity: 2, name: 'Salt'},
      {quantity: 2, name: 'Pepper'},
    ],
  },
];


