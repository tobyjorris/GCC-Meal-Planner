import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe';

@Component({
  selector: 'app-instructions-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.css']
})
export class InstructionsListComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
