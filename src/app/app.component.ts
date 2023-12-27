import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterOutlet } from '@angular/router';

import { CocktailListComponent } from "./components/cocktail-list/cocktail-list.component";
import { HeaderComponent } from './components/header/header.component';
import { DetailCoktailComponent } from "./components/detail-coktail/detail-coktail.component";
import { CorouselComponent } from './components/corousel/corousel.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, CocktailListComponent, HeaderComponent, DetailCoktailComponent,CorouselComponent]
})
export class AppComponent {
  title = 'cocktails';
}
