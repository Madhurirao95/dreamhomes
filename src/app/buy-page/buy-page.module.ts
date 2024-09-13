import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BuyPageComponent } from './buy-page.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { ImageCarouselModule } from '../shared/image-carousel/image-carousel.module';

@NgModule({
  declarations: [BuyPageComponent],
  imports: [SharedModule, ImageCarouselModule, GeoapifyGeocoderAutocompleteModule.withConfig('1c550161c4074077b4fe42fd127d6139')],
  exports: [BuyPageComponent],
  providers: []
})
export class BuyPageModule {}
