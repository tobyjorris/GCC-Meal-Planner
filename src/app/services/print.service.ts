import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  public printedRecipe: Subject<object> = new BehaviorSubject<object>(null);
  public printedList: Subject<object> = new BehaviorSubject<object>(null);


  constructor(private router: Router) { }

  printDocument(documentName: string, documentData: string) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
          print: ['print', documentName, documentData]
        }}]);
  }

  onDataReady() {
    setTimeout(() => {
      this.isPrinting = false;
      console.log('print service');
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
