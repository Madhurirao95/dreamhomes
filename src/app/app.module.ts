import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageToolBarModule } from './home-page-toolbar/home-page-toolbar.module';
import { SharedModule } from './shared/shared.module';
import { BuyPageModule } from './buy-page/buy-page.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api-services';
import { AuthenticationService } from './services/authentication-service';
import { ListingDetailsDialogModule } from './sell-page/listing-details/listing-details.module';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { UploadDocumentsModule } from './upload-documents/upload-documents.module';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { SellPageService } from './services/sell-page-service';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { SellPageModule } from './sell-page/sell-page.module';
import { ImageCarouselModule } from './shared/image-carousel/image-carousel.module';
import { PostedListingDetailsModule } from './sell-page/posted-listing-details/posted-listing-details.module';
import { BuyPageService } from './services/buy-page-service';
import { MapModule } from './shared/map/map.module';
import { ViewListingModule } from './view-listing/view-listing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageToolBarModule,
    BuyPageModule,
    SharedModule,
    HttpClientModule,
    ListingDetailsDialogModule,
    UploadDocumentsModule,
    PageNotFoundModule,
    SellPageModule,
    ImageCarouselModule,
    PostedListingDetailsModule,
    MapModule,
    ViewListingModule,
    GeoapifyGeocoderAutocompleteModule.withConfig(
      '1c550161c4074077b4fe42fd127d6139'
    )
  ],
  providers: [
    ApiService,
    AuthenticationService,
    SellPageService,
    BuyPageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
