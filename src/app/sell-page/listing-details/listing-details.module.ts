import { NgModule } from '@angular/core';
import { ListingDetailsDialogComponent } from './listing-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { UploadDocumentsModule } from 'src/app/upload-documents/upload-documents.module';
import { MaxDigitsDirective } from 'src/app/shared/directives/max-digits-directive';
import { DecimalDirective } from 'src/app/shared/directives/decimal-number-directive';
import { CommaFormatterDirective } from 'src/app/shared/directives/comma-formatter-directive';

@NgModule({
  declarations: [ListingDetailsDialogComponent, MaxDigitsDirective, DecimalDirective, CommaFormatterDirective],
  imports: [SharedModule, UploadDocumentsModule, GeoapifyGeocoderAutocompleteModule.withConfig('1c550161c4074077b4fe42fd127d6139')],
  exports: [ListingDetailsDialogComponent],
  providers: []
})
export class ListingDetailsDialogModule {}
