import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.css'
})


export class CocktailListComponent implements OnInit {
  cocktails: any[] = [];
  isExpanded = false;
  descriptionLength: number = 200; // Lunghezza massima desiderata

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }
  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  fetchData() {
    const searchQuery = 'margarita';
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    this.http.get<any>(apiUrl)
      .subscribe(
        (data: any) => {
          this.cocktails = data.drinks || []; // Assicurati che l'API restituisca drinks come array
          console.log(data)
        },
        (error) => {
          console.error('Errore nella richiesta:', error);
        }
      );
  }




  isDescriptionExpanded(description: string): boolean {
    const maxDescriptionLength = 100; // Lunghezza massima desiderata per la descrizione
    return description.length < maxDescriptionLength;
  }
  

}

