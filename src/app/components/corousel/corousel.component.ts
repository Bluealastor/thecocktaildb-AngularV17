import { Component,  OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-corousel',
    standalone: true,
    templateUrl: './corousel.component.html',
    styleUrl: './corousel.component.css',
    imports: [CommonModule]
})


export class CorouselComponent implements OnInit{


  cocktailDataStorage: string | null = localStorage.getItem('Preferite');
  data: { ids: string[], images: string[] }[] = [];


  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cocktailLocal();

    this.route.params.subscribe(params => {
      const id = params['id'];
    });
}

navigateTo(route: string): void {
  this.router.navigateByUrl(route);
  // console.log("click")
  // this.route.params.subscribe(params => {
  //   const id = params['id'];
  //   console.log("clickID",id)
  // });
  setTimeout(() => {
    window.location.reload(); 
  }, 500); 
}

// ************** GET DATA FROM LOCAL STORAGE
cocktailLocal():void {
  try {
    const parsedData: [ { id: string, img: string }[] ] = JSON.parse(this.cocktailDataStorage!);
  
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      parsedData.forEach((entry: { id: string, img: string }[]) => {
        const ids: string[] = [];
        const images: string[] = [];
      
        entry.forEach((item: { id: string, img: string }) => {
          ids.push(item?.id);
          images.push(item?.img);
        });
      
        this.data.push({ ids, images });
      });
    } else {
      console.error('Dati nel formato non valido.');
      console.log("data",this.data)
    }
  } catch (error) {
    console.error('Errore nel parsing dei dati:', error);
  }
}

}








