import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { IListingWithMediaFile } from '../Interfaces/IListing';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements AfterViewInit {
  @ViewChild('carouselInner') carouselInner!: ElementRef;
  @Input() items: IListingWithMediaFile[] = [];
  @Input() autoChange = true;

  currentIndex = 0;

  ngAfterViewInit(): void {
    if (this.autoChange) {
      setInterval(() => {
        this.nextSlide();
      }, 10000); // Change slide every 10 seconds
    }
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    this.carouselInner.nativeElement.style.transform = `translateX(-${
      this.currentIndex * 100
    }%)`;
  }
}
