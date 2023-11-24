import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailApiService } from '../../service/cocktail-api.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.css'
})


export class CocktailListComponent implements OnInit {
  cocktails: any[] = [];
  descriptionLength: number = 200;
  public searchData: string = 'Gin';

  constructor(private cocktailApiService: CocktailApiService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSearchData().subscribe((searchQuery: string) => {
      // Aggiorna i dati ogni volta che il valore in DataService cambia
      this.getCocktails(searchQuery);
    });
  }

  getCocktails(searchQuery: string): void {
    this.cocktailApiService.getCocktails(searchQuery).subscribe(
      (data: any) => {
        this.cocktails = data.drinks || [];
        console.log(this.cocktails); // Usa i dati come necessario all'interno del componente
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

