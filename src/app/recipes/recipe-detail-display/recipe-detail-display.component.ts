import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../../recipe';

@Component({
  selector: 'app-recipe-detail-display',
  templateUrl: './recipe-detail-display.component.html',
  styleUrls: ['./recipe-detail-display.component.css']
})
export class RecipeDetailDisplayComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
