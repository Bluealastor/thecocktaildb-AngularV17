import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-cocktail-card-component',
  standalone: true,
  imports: [CommonModule, RouterModule,MatCardModule, MatButtonModule],
  templateUrl: './cocktail-card-component.component.html',
  styleUrl: './cocktail-card-component.component.css'
})
export class CocktailCardComponentComponent implements OnInit{
  @Input() cocktail: any;
  isCardFound: boolean = true; 
  idVariabile: string = 'idDinamico';
  isFavorite: boolean = false;
  textResponsive: string = "";
  lenghtText: number= 100;

  // Controlla se l'ID corrente è tra quelli nel localStorage
  buttonImage: string = '../../../assets/heart.png'; // Immagine predefinita per il pulsante

  // Controlla se l'ID corrente è tra quelli nel localStorage
  verificaIDLocalStorage(): void {
    const idsString = localStorage.getItem('storedIDs');
    if (idsString) {
      const arrayDiIDs: string[] = JSON.parse(idsString);
      this.isFavorite = arrayDiIDs.includes(this.cocktail.idDrink);

      // Cambia l'immagine in base allo stato di 'isFavorite'
      if (this.isFavorite) {
        this.buttonImage = '../../../assets/heartred.png'; // Percorso immagine per il preferito
      } else {
        this.buttonImage = '../../../assets/heart.png'; // Percorso immagine per il non-preferito
      }
    }
  }
  gestisciPreferito(): void {
    const idsString = localStorage.getItem('storedIDs');
    let arrayDiIDs: string[] = idsString ? JSON.parse(idsString) : [];
    if (this.isFavorite) {
      arrayDiIDs = arrayDiIDs.filter(id => id !== this.cocktail.idDrink);
    } else {
      arrayDiIDs.push(this.cocktail.idDrink);
    }
    localStorage.setItem('storedIDs', JSON.stringify(arrayDiIDs));
    this.isFavorite = !this.isFavorite;
    // Cambia l'immagine del pulsante dopo aver aggiornato 'isFavorite'
    if (this.isFavorite) {
      this.buttonImage = '../../../assets/heartred.png';
    } else {
      this.buttonImage = '../../../assets/heart.png';
    }
  }

  responsiveText(text: string): string{
    if (text.length > this.lenghtText){
      return text.substring(0, this.lenghtText) + "..."
    }
    return text
  }




  ngOnInit(): void {
  // console.log(this.cocktail)
  // console.log(localStorage.getItem('storedIDs'))
  this.verificaIDLocalStorage();
  // console.log("cocktail", this.cocktail)
    
  }
}
