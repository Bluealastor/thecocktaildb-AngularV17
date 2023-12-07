import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private dataService: DataService,private router: Router) {}

  onInputChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataService.setSearchData(this.searchQuery);
  }

  redirectToCocktailList(): void {
    this.router.navigate(['/']);
  }

  // search() {
  //   console.log('Testo cercato:', this.searchQuery);
  // }
}
