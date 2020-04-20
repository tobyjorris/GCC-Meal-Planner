import { Recipe } from '../recipe';

export const RECIPES: Recipe[] = [
  { id: 1,
    title: 'White Chicken Chili',
    instructions: 'Crock-pot for 8 hours',
    ingredients: [
      {quantity: 3, name: 'Chicken', measurement: 'pounds'},
      {quantity: 1, name: 'Beans', measurement: '12 oz can'},
      {quantity: 2, name: 'Tomatoes', measurement: 'each'},
      {quantity: 1, name: 'Onion', measurement: 'each'},
      {quantity: 14, name: 'Cream', measurement: 'oz'},
      {quantity: 2, name: 'Shredded Cheese', measurement: 'cups'},
    ],
  },
  { id: 2,
    title: 'Turkey Meatballs',
    instructions: 'Cook in oven at 375 degrees for 4.5 - 5.0 hours',
    ingredients: [
      {quantity: 8, name: 'Ground Turkey', measurement: 'pounds'},
      {quantity: 5, name: 'BBQ Sauce', measurement: 'cups'},
      {quantity: 2, name: 'Onion Powder', measurement: 'Tbsp'},
      {quantity: 2, name: 'Eggs', measurement: 'each'},
    ],
  },
  { id: 3,
    title: 'Steak On The Grill',
    instructions: 'Grill over high heat for 3 minutes each side',
    ingredients: [
      {quantity: 10, name: 'Steak', measurement: 'pounds'},
      {quantity: 2, name: 'Salt', measurement: 'Tsp'},
      {quantity: 2, name: 'Pepper', measurement: 'Tsp'},
    ],
  },
];


