import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDropdownBasic } from './shared/dropdown/dropdown-basic';
import { NgbdModalBasic } from './recipe-modal/recipe-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    ToolbarComponent,
    BackdropComponent,
    ShoppingListComponent,
    NgbdDropdownBasic,
    NgbdModalBasic
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
