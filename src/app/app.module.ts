import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';
import { BackdropComponent } from './backdrop/backdrop.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    ToolbarComponent,
    RecipeModalComponent,
    BackdropComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
