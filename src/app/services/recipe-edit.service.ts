import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditService {
  startedEditing = new Subject<number>();

  constructor() { }
}
