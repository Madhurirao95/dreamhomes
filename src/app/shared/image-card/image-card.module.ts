import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCarouselModule } from '../image-carousel/image-carousel.module';
import { ImageCardComponent } from './image-card.component';

@NgModule({
  declarations: [ImageCardComponent],
  imports: [SharedModule, ImageCarouselModule],
  exports: [ImageCardComponent],
  providers: []
})
export class ImageCardModule {}
