import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BuyPageComponent } from './buy-page.component';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { ImageCardModule } from '../shared/image-card/image-card.module';
import { MapModule } from '../shared/map/map.module';
import { ViewListingModule } from '../view-listing/view-listing.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: BuyPageComponent }];
@NgModule({
  declarations: [BuyPageComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ImageCardModule, ViewListingModule, FooterModule, MapModule, GeoapifyGeocoderAutocompleteModule.withConfig('1c550161c4074077b4fe42fd127d6139')],
  exports: [BuyPageComponent, RouterModule],
  providers: []
})
export class BuyPageModule {}
