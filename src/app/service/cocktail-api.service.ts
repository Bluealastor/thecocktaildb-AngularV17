import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';6

@Injectable({
  providedIn: 'root'
})

  export class CocktailApiService {
    private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
    private pointSearchCocktailUrl = 'search.php?s='
    private pointSearchIdUrl = 'lookup.php?i='
  
    constructor(private http: HttpClient) {}



    getCocktails(searchQuery: string): Observable<any> {
      const apiUrl = `${this.baseUrl + this.pointSearchCocktailUrl}${searchQuery}`;
      return this.http.get<any>(apiUrl);
    }

    getIdCocktails(idQuery:string): Observable<any>{
      const apiUrl =  `${this.baseUrl + this.pointSearchIdUrl}${idQuery}` 
      return this.http.get<any>(apiUrl)
    }
  }