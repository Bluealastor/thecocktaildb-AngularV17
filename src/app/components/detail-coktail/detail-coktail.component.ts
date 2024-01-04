import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CocktailApiService } from '../../service/cocktail-api.service';
import { CorouselComponent } from "../corousel/corousel.component";

@Component({
    selector: 'app-detail-coktail',
    standalone: true,
    templateUrl: './detail-coktail.component.html',
    styleUrl: './detail-coktail.component.css',
    imports: [CommonModule, CorouselComponent]
})
export class DetailCoktailComponent implements OnInit {
  cocktailDetail: any[] = []
  cocktailId = 0
  router: ActivatedRoute = inject(ActivatedRoute)
  idDrink = 0
  videoId: string | null = null;



  constructor(private cocktailApiService: CocktailApiService,) {
    this.cocktailId = Number(this.router.snapshot.params['id'])

  }

  ngOnInit(): void {
    // console.log("id", this.cocktailId)
    // console.log("idString", this.cocktailId.toString())
    this.getCoktailsDetail(this.cocktailId.toString())

  }




  getCoktailsDetail(idQuery: string): void {
    this.cocktailApiService?.getIdCocktails(idQuery).subscribe((data: any) => {
      // console.log(data)
      console.log(data.drinks[0])

      if (Array.isArray(data.drinks)) {
        this.cocktailDetail = data.drinks;
        const firstDrink = this.cocktailDetail[0];
        // if (firstDrink && firstDrink.strVideo) {
        //   this.videoId = this.extractYouTubeId(firstDrink.strVideo);
        // }
      } else {
        this.cocktailDetail = [];
      }
    },
      (error) => {
        console.error('Errore nella richiesta:', error);
      }
    );
  }

  checkIngredients(): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = this.valueIngredients(this.cocktailDetail, 'strIngredient' + i);

      if (ingredient !== '') {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }

  checkMeasure(): string[] {
    const measures: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const measure = this.valueIngredients(this.cocktailDetail, 'strMeasure' + i)
      if (measure !== "") {
        measures.push(measure)
      }
    }
    return measures
  }

  valueIngredients(data: any, key: string): string {
    return data?.[0]?.[key] || '';
  }

  combineIngredientsAndMeasures(): { ingredient: string, measure: string }[] {
    const ingredients = this.checkIngredients();
    const measures = this.checkMeasure();

    const combinedData = [];
    const maxLength = Math.max(ingredients.length, measures.length);

    for (let i = 0; i < maxLength; i++) {
      const ingredient = ingredients[i] || '';
      const measure = measures[i] || '';
      combinedData.push({ ingredient, measure });
    }

    return combinedData;
  }

}

