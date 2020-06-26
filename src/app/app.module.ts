import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { HeaderComponent } from './header/header.component';
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
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
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
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { IngredientEditComponent } from './ingredients/ingredient-edit/ingredient-edit.component';
import { IngredientEditFormComponent } from './ingredients/ingredient-edit-form/ingredient-edit-form.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

const appRoutes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: LoginPageComponent },
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]},
  {path: 'shopping-cart', component: ShoppingListComponent, canActivate: [AuthGuard]},
  {path: 'recipe-edit', component: RecipeEditComponent, canActivate: [AuthGuard]},
  {path: 'ingredient-edit', component: IngredientEditComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    HeaderComponent,
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
    LoginPageComponent,
    PageNotFoundComponent,
    IngredientEditComponent,
    IngredientEditFormComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FractionizeModule,
    [NgxAuthFirebaseUIModule.forRoot(environment.firebase)],
    MatMenuModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
