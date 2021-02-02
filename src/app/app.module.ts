import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as firebase from 'firebase';
import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstructionsListComponent } from './recipes/recipe-detail-display/instructions-list/instructions-list.component';
import { RecipeDetailDisplayComponent } from './recipes/recipe-detail-display/recipe-detail-display.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeAddFormComponent } from './recipe-edit/recipe-add-form/recipe-add-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { FractionizeModule } from './pipes/fraction/fraction.pipe';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { IngredientEditComponent } from './ingredients/ingredient-edit/ingredient-edit.component';
import { IngredientEditFormComponent } from './ingredients/ingredient-edit-form/ingredient-edit-form.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UnitDisplayPipe } from './pipes/unit-display/unit-display.pipe';
import { ShoppingDistributionComponent } from './shopping-list/shopping-distribution/shopping-distribution.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { PrintRecipeComponent } from './print/print-recipe/print-recipe.component';
import { PrintListComponent } from './print/print-list/print-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeKeyComponent } from './recipes/recipe-key/recipe-key.component';
import { HistoryComponent } from './history/history.component';
import { HistoryItemComponent } from './history/history-item/history-item.component';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    HeaderComponent,
    ShoppingListComponent,
    InstructionsListComponent,
    RecipeDetailDisplayComponent,
    RecipeListComponent,
    RecipesComponent,
    NavbarComponent,
    FilterPipe,
    RecipeEditComponent,
    RecipeAddFormComponent,
    DialogComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    IngredientEditComponent,
    IngredientEditFormComponent,
    UnitDisplayPipe,
    ShoppingDistributionComponent,
    ProfilePageComponent,
    PrintLayoutComponent,
    PrintRecipeComponent,
    PrintListComponent,
    RecipeKeyComponent,
    HistoryComponent,
    HistoryItemComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        Ng2SearchPipeModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        FractionizeModule,
        NgxAuthFirebaseUIModule.forRoot(
          environment.firebase,
          () => 'meal-planner-factory',
          {
            enableFirestoreSync: true, // enable/disable autosync users with firestore
            toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
            toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
            authGuardFallbackURL: '/log-in', // url for unauthenticated users - to use in combination with canActivate feature on a route
            authGuardLoggedInURL: '/recipes', // url for authenticated users - to use in combination with canActivate feature on a route
            passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
            passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
            // Same as password but for the name
            nameMaxLength: 50,
            nameMinLength: 2,
            // If set, sign-in/up form is not available until email has been verified.
            // Plus protected routes are still protected even though user is connected.
            guardProtectedRoutesUntilEmailIsVerified: false,
            enableEmailVerification: true, // default: true
          }
        ),
        MatMenuModule,
        MatToolbarModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTabsModule,
        AppRoutingModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
