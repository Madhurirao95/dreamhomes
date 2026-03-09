import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellPageComponent } from './sell-page.component';
import { ListingDetailsDialogModule } from './listing-details/listing-details.module';
import { ImageCarouselModule } from '../shared/image-carousel/image-carousel.module';
import { PostedListingDetailsModule } from './posted-listing-details/posted-listing-details.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: SellPageComponent }];
@NgModule({
  declarations: [SellPageComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ListingDetailsDialogModule,
    ImageCarouselModule,
    PostedListingDetailsModule,
    FooterModule,
  ],
  exports: [SellPageComponent, RouterModule],
  providers: [],
})
export class SellPageModule {}
