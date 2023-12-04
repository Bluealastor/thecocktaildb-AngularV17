import { Routes } from '@angular/router';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { DetailCoktailComponent } from './components/detail-coktail/detail-coktail.component';

export const routes: Routes = [
    {path: '', component: CocktailListComponent  },
    {path: 'detail/:id', component: DetailCoktailComponent },
];
