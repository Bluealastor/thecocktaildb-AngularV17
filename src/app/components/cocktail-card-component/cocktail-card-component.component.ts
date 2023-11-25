import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-card-component.component.html',
  styleUrl: './cocktail-card-component.component.css'
})
export class CocktailCardComponentComponent {
  @Input() cocktail: any;
  showPopup = false;


  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}
