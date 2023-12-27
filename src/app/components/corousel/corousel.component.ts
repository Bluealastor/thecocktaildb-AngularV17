import { Component,  ElementRef,  OnInit, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

declare var $: any;

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

  activeIndex = 0; // Imposta l'indice attivo iniziale
  imagesLoaded = false;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.cocktailLocal();

    const carousel = this.elementRef.nativeElement.querySelector('#carousel-example');
    carousel.addEventListener('slide.bs.carousel', (e: any) => {
      const relatedTarget = e.relatedTarget;
      const idx = Array.from(relatedTarget.parentElement.children).indexOf(relatedTarget);
      const itemsPerSlide = 5;
      const totalItems = carousel.querySelectorAll('.carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
          // Append slides to end
          if (e.direction === 'left') {
            const carouselItems = carousel.querySelectorAll('.carousel-item');
            this.renderer.appendChild(carousel.querySelector('.carousel-inner'), carouselItems[i]);
          } else {
            const firstCarouselItem = carousel.querySelector('.carousel-item');
            this.renderer.appendChild(carousel.querySelector('.carousel-inner'), firstCarouselItem);
          }
        }
      }
    });

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
// **************













// ******************************CAROSELLO****************************************


imageLoaded(): void {
  // Controlla se tutte le immagini sono state caricate
  const loadedImages = document.querySelectorAll('.carousel-item img');
  this.imagesLoaded = loadedImages.length === this.data.length;
}

next(): void {
  this.activeIndex = (this.activeIndex === this.data.length - 1) ? 0 : this.activeIndex + 1;
}

// Funzione per passare all'immagine precedente
prev(): void {
  this.activeIndex = (this.activeIndex === 0) ? this.data.length - 1 : this.activeIndex - 1;
}

// **************************************************************************************




}








