import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailApiService } from '../../service/cocktail-api.service';
import { DataService } from '../../service/data.service';
import { CocktailCardComponentComponent } from "../cocktail-card-component/cocktail-card-component.component";
// import { DetailComponent } from "../detail/detail.component";

@Component({
    selector: 'app-cocktail-list',
    standalone: true,
    templateUrl: './cocktail-list.component.html',
    styleUrl: './cocktail-list.component.css',
    imports: [CommonModule, CocktailCardComponentComponent]
})


export class CocktailListComponent implements OnInit {
  cocktails: any[] = [];
  descriptionLength: number = 200;
  public searchData: string = '';


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
        console.log("data",data)
        this.cocktails = data.drinks || [];
      },
      (error) => {
        console.error('Errore nella richiesta:', error);
      }
    );
  }




  isDescriptionExpanded(description: string): boolean {
    const maxDescriptionLength = 100;
    return description.length < maxDescriptionLength;
  }
  

}

