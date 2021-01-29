import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fractionize'
})
export class FractionizePipe implements PipeTransform {

  public static denominatorMap = [];
  private tolerance = .01;

  public unicodeMap = {
    2: {
      1: '\u00BD'
    },
    3: {
      1: '\u2153',
      2: '\u2154'
    },
    4: {
      1: '\u00BC',
      3: '\u00BE'
    },
    5: {
      1: '\u2155',
      2: '\u2156',
      3: '\u2157',
      4: '\u2158'
    },
    6: {
      1: '\u2159',
      5: '\u215A'
    },
    7: {
      1: '\u2150',
    },
    8: {
      1: '\u215B',
      3: '\u215C',
      5: '\u215D',
      7: '\u215E'
    },
    9: {
      1: '\u2151'
    }

  };

  static createDenominatorMap(maxDenominator: number) {
    while (FractionizePipe.denominatorMap.length < maxDenominator) {
      const currentDenominator = FractionizePipe.denominatorMap.length + 1;
      const m = [];
      for (let i = 1; i <= currentDenominator; i++) {
        m.push(i / currentDenominator);
      }
      FractionizePipe.denominatorMap.push(m);
    }
  }

  transform(text: any, maxDenominator= 64): string {
    if (FractionizePipe.denominatorMap.length < maxDenominator) {
      FractionizePipe.createDenominatorMap(maxDenominator);
    }

    let v = text;
    if (typeof v !== 'number') {
      v = Number(v);
    }

    if (isNaN(v)) {
      return text;
    }

    const decimalPortion = v % 1;
    const integerPortion = Math.floor(v);
    for (let i = 0; i < maxDenominator; i++) {
      for (let j = 0 ; j < FractionizePipe.denominatorMap[i].length; j ++) {
        if (decimalPortion === FractionizePipe.denominatorMap[i][j]) {
          return this.formatResult(integerPortion, j + 1, i + 1);
        }
      }
    }

    for (let i = 0; i < maxDenominator; i ++) {
      for (let j = 0; j < FractionizePipe.denominatorMap[i].length; j++) {
        if (decimalPortion + this.tolerance > FractionizePipe.denominatorMap[i][j] &&
          decimalPortion - this.tolerance < FractionizePipe.denominatorMap[i][j]) {
          return this.formatResult(integerPortion, j + 1, i + 1);
        }
      }
    }

    return text;
  }

  formatResult(integerPortion, numerator, denominator) {

    if (this.unicodeMap[denominator.toString()] &&
      this.unicodeMap[denominator.toString()][numerator.toString()]) {

      return [
        integerPortion ? integerPortion : '',
        integerPortion ? ' ' : '',
        this.unicodeMap[denominator.toString()][numerator.toString()]
      ].join('');
    }

    return [
      integerPortion ? integerPortion : '',
      integerPortion ? ' ' : '',
      numerator,
      '/',
      denominator].join('');
  }
}

@NgModule({
  declarations: [FractionizePipe],
  exports: [FractionizePipe]
})
export class FractionizeModule { }




