import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

  export class CocktailApiService {
    private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  
    constructor(private http: HttpClient, private dataService: DataService) {}



    getCocktails(searchQuery: string): Observable<any> {
      const apiUrl = `${this.baseUrl}${searchQuery}`;
      return this.http.get<any>(apiUrl);
    }
  
    // Aggiungi altri metodi per gestire altre operazioni sulle API dei cocktail, se necessario
  }