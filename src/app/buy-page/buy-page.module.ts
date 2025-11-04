import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BuyPageComponent } from './buy-page.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { ImageCardModule } from '../shared/image-card/image-card.module';
import { MapModule } from '../shared/map/map.module';
import { ViewListingModule } from '../view-listing/view-listing.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [BuyPageComponent],
  imports: [SharedModule, ImageCardModule, ViewListingModule, FooterModule, MapModule, GeoapifyGeocoderAutocompleteModule.withConfig('1c550161c4074077b4fe42fd127d6139')],
  exports: [BuyPageComponent],
  providers: []
})
export class BuyPageModule {}
