import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { HeaderComponent } from './header/header.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDropdownBasic } from './shared/dropdown/dropdown-basic';
import { NgbdModalBasic } from './recipes/recipe-detail-modal/recipe-detail-modal.component';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { RecipeDetailDisplayComponent } from './recipes/recipe-detail-display/recipe-detail-display.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { RecipeSearchBarComponent } from './recipes/recipe-search-bar/recipe-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    HeaderComponent,
    BackdropComponent,
    ShoppingListComponent,
    NgbdDropdownBasic,
    NgbdModalBasic,
    InstructionsListComponent,
    RecipeDetailDisplayComponent,
    RecipeListComponent,
    RecipesComponent,
    NavbarComponent,
    RecipeSearchBarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
