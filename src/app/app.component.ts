import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CocktailListComponent } from "./components/cocktail-list/cocktail-list.component";
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, CocktailListComponent, HeaderComponent]
})
export class AppComponent {
  title = 'cocktails';
}
