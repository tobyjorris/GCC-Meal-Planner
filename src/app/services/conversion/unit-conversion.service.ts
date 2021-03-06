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
    if  (measurement === 'tsp' || measurement === 'tbs' || measurement === 'Tbs') {
      return convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('Tbs')).toFixed(2),
        measurement: 'tbs'
      };
    } else if (measurement === 'cups' || measurement === 'fl-oz'){
      return convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('fl-oz')).toFixed(2),
        measurement: 'fl oz'
      };
    } else if (measurement === 'lb' || measurement === 'oz') {
      return convertedIngredient = {
        name,
        quantity: Number(convertUnits(quantity).from(measurement).to('oz')).toFixed(2),
        measurement: 'oz'
      };
    } else {
      return convertedIngredient = {
        name,
        quantity,
        measurement
      };
    }
  }
}
