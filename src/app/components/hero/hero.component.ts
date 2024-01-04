import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailApiService } from '../../service/cocktail-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  cocktails: any[] = [];
 
  constructor(private cocktailApiService: CocktailApiService, private router: Router){}
 
  ngOnInit(): void {
    this.getCocktailTop();
  }

  getCocktailTop(): void{this.cocktailApiService.getTopCocktail().subscribe(
    (data: any) => {
      // console.log("data",data)
      this.cocktails = data.drinks || [];
      console.log("hero", data.drinks)
    },
    (error) => {
      console.error('Errore nella richiesta:', error);
    }
  );}

  navigateToDetail(itemId: number): void {
    this.router.navigate(['/detail', itemId]);
  }

}


