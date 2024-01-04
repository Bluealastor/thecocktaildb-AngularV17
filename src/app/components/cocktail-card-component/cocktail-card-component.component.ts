import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AnimationService } from '../../service/animation.service';


@Component({
    selector: 'app-cocktail-card-component',
    standalone: true,
    templateUrl: './cocktail-card-component.component.html',
    styleUrl: './cocktail-card-component.component.css',
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, ]
})
export class CocktailCardComponentComponent implements OnInit{
  // INSERIMENTO DEI DATI PER LA FUNZIONE FAVORITO
  @Input() cocktail: any;
  isFavorite: boolean = false;
  
  // SERVE PER RENDERE IL TESTO RESPONSIVE 
  textResponsive: string = "";
  lenghtText: number= 100;

  // Controlla se l'ID corrente è tra quelli nel localStorage
  buttonImage: string = '../../../assets/heart.png'; // Immagine predefinita per il pulsante



  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // console.log(this.cocktail)
    // console.log(localStorage.getItem('storedIDs'))
    this.verificaIDLocalStorage();
    // console.log("cocktail", this.cocktail)
    this.animationService.startAnimationByClass('borderers');
    }


  // Controlla se l'ID corrente è tra quelli nel localStorage
  verificaIDLocalStorage(): void {
    const idsString = localStorage.getItem('Preferite');
  let arrayDiIDs: { id: string; img: string }[][] = idsString ? JSON.parse(idsString) : [];
  const cocktailID = this.cocktail.idDrink;

  let isFavorite = false;

  for (const element of arrayDiIDs) {
    const existingIndex = element.findIndex(item => item.id === cocktailID);
    if (existingIndex !== -1) {
      isFavorite = true;
      break;
    }
  }

  // Imposta lo stato isFavorite in base alla presenza dell'ID del cocktail
  this.isFavorite = isFavorite;
  if (this.isFavorite) {
    this.buttonImage = '../../../assets/heartred.png'; // Percorso immagine per il preferito
  } else {
    this.buttonImage = '../../../assets/heart.png'; // Percorso immagine per il non-preferito
  }
}
gestisciPreferito(): void {
  const getIdAndImg = localStorage.getItem('Preferite');
  let idAndImgData: { id: string; img: string }[][] = getIdAndImg ? JSON.parse(getIdAndImg) : [];
  const cocktailData = {
    id: this.cocktail.idDrink,
    img: this.cocktail.strDrinkThumb,
  };

  let existingIndex = -1;

  // Cerca un array contenente l'elemento attuale
  idAndImgData.forEach((element, index) => {
    const foundIndex = element.findIndex(item => item.id === cocktailData.id);
    if (foundIndex !== -1) {
      existingIndex = index;
    }
  });

  if (existingIndex !== -1) {
    const existingElementIndex = idAndImgData[existingIndex].findIndex(item => item.id === cocktailData.id);
    if (existingElementIndex !== -1) {
      idAndImgData[existingIndex].splice(existingElementIndex, 1);
      if (idAndImgData[existingIndex].length === 0) {
        idAndImgData.splice(existingIndex, 1);
      }
    }
  } else {
    idAndImgData.push([cocktailData]);
  }

  localStorage.setItem('Preferite', JSON.stringify(idAndImgData));

  // Aggiorna lo stato 'isFavorite' e cambia l'immagine del pulsante
  this.isFavorite = !this.isFavorite;
  this.buttonImage = this.isFavorite ? '../../../assets/heartred.png' : '../../../assets/heart.png';
}
  

  responsiveText(text: string): string{
    if (text.length > this.lenghtText){
      return text.substring(0, this.lenghtText) + "..."
    }
    return text
  }





}
