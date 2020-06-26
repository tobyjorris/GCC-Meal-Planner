import { Injectable } from '@angular/core';
// @ts-ignore
import * as convertUnits from 'convert-units';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor() { }

  convert({name, quantity, measurement}) {
    if  (measurement === 'Tbs' || 'tsp' || 'cup' || 'fl-oz') {
      const convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('cup')).toFixed(2),
        measurement: 'cup'
      };
      // console.log('Service: Converted Ingredient:', convertedIngredient);
      return convertedIngredient;
    } else if (measurement === 'oz' || 'lb') {
      return convertUnits(quantity).from(measurement).to('lb').toFixed(2);
    }
  }
}
