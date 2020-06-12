import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { HeaderComponent } from './header/header.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDropdownBasic } from './shared/dropdown/dropdown-basic';
import { InstructionsListComponent } from './instructions-list/instructions-list.component';
import { RecipeDetailDisplayComponent } from './recipes/recipe-detail-display/recipe-detail-display.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { Routes, RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RecipeAddFormComponent } from './recipes/recipe-edit/recipe-add-form/recipe-add-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { FractionizeModule } from './fraction.pipe';
import { PrintModalComponent } from './recipes/print/print-modal/print-modal.component';
import { ShoppingPrintModalComponent } from './shopping-list/shopping-print-modal/shopping-print-modal.component';

const appRoutes: Routes = [
  {path: '', component: RecipesComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'recipe-edit', component: RecipeEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    HeaderComponent,
    BackdropComponent,
    ShoppingListComponent,
    NgbdDropdownBasic,
    InstructionsListComponent,
    RecipeDetailDisplayComponent,
    RecipeListComponent,
    RecipesComponent,
    NavbarComponent,
    FilterPipe,
    RecipeEditComponent,
    RecipeAddFormComponent,
    DialogComponent,
    PrintModalComponent,
    ShoppingPrintModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FractionizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
