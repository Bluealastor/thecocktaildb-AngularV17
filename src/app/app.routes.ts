import { Routes } from '@angular/router';
// import { DetailComponent } from './components/detail/detail.component';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '',component: AppComponent },
    {path:"Cocktail", component:CocktailListComponent},
    // { path: 'detail', component: DetailComponent}
];
