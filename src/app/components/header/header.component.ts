import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private dataService: DataService) {}

  onInputChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.dataService.setSearchData(this.searchQuery);
  }

  search() {
    console.log('Testo cercato:', this.searchQuery);
  }
}
