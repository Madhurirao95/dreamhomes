import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements AfterViewInit {
  @ViewChild('carouselInner') carouselInner!: ElementRef;
  items = [
    { imageUrl: 'assets/carousel-img2.jpg', alt: 'Image 1' },
    { imageUrl: 'assets/carousel-img1.jpg', alt: 'Image 2' },
    { imageUrl: 'assets/carousel-img3.jpg', alt: 'Image 3' },
    { imageUrl: 'assets/carousel-img4.jpg', alt: 'Image 4' }
  ];

  currentIndex = 0;

  ngAfterViewInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 10000); // Change slide every 10 seconds
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
