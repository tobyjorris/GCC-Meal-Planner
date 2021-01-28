import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IngredientEditComponent } from './ingredients/ingredient-edit/ingredient-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';
import { PrintRecipeComponent } from './print/print-recipe/print-recipe.component';
import { PrintListComponent } from './print/print-list/print-list.component';
import { HistoryComponent } from './history/history.component';

const appRoutes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [LoggedInGuard] },
  {path: 'profile', component: ProfilePageComponent, canActivate: [LoggedInGuard]},
  {path: 'log-in', component: LoginPageComponent },
  {path: 'recipes', component: RecipesComponent, canActivate: [LoggedInGuard]},
  {path: 'shopping-cart', component: ShoppingListComponent, canActivate: [LoggedInGuard]},
  {path: 'recipe-edit', component: RecipeEditComponent, canActivate: [LoggedInGuard]},
  {path: 'ingredient-edit', component: IngredientEditComponent, canActivate: [LoggedInGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [LoggedInGuard]},
  {path: '**', component: PageNotFoundComponent},
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      {path: 'recipe-print/:recipeIds', component: PrintRecipeComponent},
      {path: 'shopping-print/:shoppingIds', component: PrintListComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
