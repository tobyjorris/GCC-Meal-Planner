export const condenseIngredients = ingredientArray => {
  const condensedIngredients = {};
  const originalArray = ingredientArray;
  let ingredientsArray: any[];
  const returnedArray = [];

  for (const ingredient of originalArray) {
    if (!condensedIngredients[ingredient.name]) {
      condensedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
    } else {
      if (Object.keys(condensedIngredients[ingredient.name]).includes(ingredient.measurement)) {
        condensedIngredients[ingredient.name][ingredient.measurement] = condensedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
      } else {
        condensedIngredients[ingredient.name][ingredient.measurement] = Number(ingredient.quantity);
      }
    }
  }
  ingredientsArray = Object.entries(condensedIngredients);
  ingredientsArray.forEach(([name, details]) => {
    const ingredientObj = {
      name,
      measurements: []
    };
    for (const [unit, quantity] of Object.entries(details)) {
      ingredientObj.measurements.push({unit, quantity});
    }
    returnedArray.push(ingredientObj);
  });
  returnedArray.sort((a, b) => {
    return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 :
      (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : 0;
  });
  return returnedArray;
};

// *THE OLD CODE FOR THIS*

// console.log('sortedIngredients', sortedIngredients);
// convertedIngredientsArray.map(ingredient => {
//   if (!sortedIngredients[ingredient.name]) {
//     sortedIngredients[ingredient.name] = {[ingredient.measurement]: Number(ingredient.quantity)};
//     console.log('if', sortedIngredients[ingredient.name]);
//   } else {
//     sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
//     console.log('else', sortedIngredients[ingredient.name]);
//   }
// });

