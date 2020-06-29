import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitDisplay'
})
export class UnitDisplayPipe implements PipeTransform {

  transform(unit: string){
    if (unit === 'cup') {
      return 'cups';
    } else if (unit === 'lb') {
      return 'pounds';
    } else if (unit === 'fl-oz') {
      return 'oz';
    } else {
      return unit;
    }
  }

}
