import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellPageComponent } from './sell-page.component';
import { ListingDetailsDialogModule } from './listing-details/listing-details.module';
import { ImageCarouselModule } from './image-carousel/image-carousel.module';
import { PostedListingDetailsModule } from './posted-listing-details/posted-listing-details.module';

@NgModule({
  declarations: [SellPageComponent],
  imports: [SharedModule, ListingDetailsDialogModule, ImageCarouselModule, PostedListingDetailsModule],
  exports: [SellPageComponent],
  providers: []
})
export class SellPageModule {}
