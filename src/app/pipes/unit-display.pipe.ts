import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitDisplay'
})
export class UnitDisplayPipe implements PipeTransform {

  transform(unit: string){
    if (unit === 'cup') {
      return 'cups';
    } else if (unit === 'lb') {
      return 'lbs';
    } else if (unit === 'fl-oz') {
      return 'oz';
    } else if (unit === 'Tbs') {
      return 'tbsp';
    } else {
      return unit;
    }
  }

}
