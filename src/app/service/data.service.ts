import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private searchData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setSearchData(data: string) {
    this.searchData.next(data);
  }

  getSearchData(): BehaviorSubject<string> {
    return this.searchData;
  }
}
