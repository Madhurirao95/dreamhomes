import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCarouselComponent } from './image-carousel.component';
@NgModule({
  declarations: [ImageCarouselComponent],
  imports: [SharedModule],
  exports: [ImageCarouselComponent],
  providers: []
})
export class ImageCarouselModule {}
