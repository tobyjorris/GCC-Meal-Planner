import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(arr: any[], searchText: string): any[] {
    if (arr) {
      if (!searchText) {
        return arr;
      } else {
        return arr.filter(rec => rec.title.toLowerCase().includes(searchText.toLowerCase()));
      }
    } else {
      return [];
    }
  }

}
