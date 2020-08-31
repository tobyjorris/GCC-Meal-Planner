import { Injectable } from '@angular/core';
// @ts-ignore
import * as convertUnits from 'convert-units';

@Injectable({
  providedIn: 'root'
})
export class UnitConversionService {

  constructor() { }

  convert({name, quantity, measurement}) {
    let convertedIngredient = {};
    if  (measurement === 'Tbs' || measurement === 'tsp' || measurement === 'fl-oz') {
      convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('cup')).toFixed(2),
        measurement: 'cup'
      };
      return convertedIngredient;
    } else if (measurement === 'oz') {
      convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('lb')).toFixed(2),
        measurement: 'pounds'
      };
      return convertedIngredient;
    } else {
      convertedIngredient = {
        name,
        quantity,
        measurement
      };
      return convertedIngredient;
    }
  }
}
