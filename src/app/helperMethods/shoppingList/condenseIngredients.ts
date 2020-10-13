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
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
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
//     tslint:disable-next-line:max-line-length
//     sortedIngredients[ingredient.name][ingredient.measurement] = sortedIngredients[ingredient.name][ingredient.measurement] + Number(ingredient.quantity);
//     console.log('else', sortedIngredients[ingredient.name]);
//   }
// });

