import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(arr: any[], type: string , searchText: string): any[] {
    if (arr) {
      if (type === 'search') {
        if (!searchText) {
          return arr;
        } else {
          return arr.filter(rec => rec.title.toLowerCase().includes(searchText.toLowerCase()));
        }
      } else if (type === 'date') {
        return arr.sort().reverse();
      }
    } else {
      return [];
    }
    // if (arr) {
    //   if (!searchText) {
    //     return arr;
    //   } else {
    //     return arr.filter(rec => rec.title.toLowerCase().includes(searchText.toLowerCase()));
    //   }
    // } else {
    //   return [];
    // }
  }
}
