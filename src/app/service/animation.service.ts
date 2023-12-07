import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  startAnimationByClass(className: string) {
    const elements = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
    Array.from(elements).forEach((element: HTMLElement) => {
      element.style.borderRadius = '0%'; 
      setTimeout(() => {
        element.style.borderRadius = '80% 70% 70% 80%/80% 80% 70% 70%';
        element.classList.add('start-animation');
      }, 5000);
    });
  }

}
