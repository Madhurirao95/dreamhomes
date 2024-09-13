import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { BuyPageModule } from './buy-page/buy-page.module';
import { HomePageToolBarModule } from './home-page-toolbar/home-page-toolbar.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { ImageCarouselModule } from './shared/image-carousel/image-carousel.module';
import { ListingDetailsDialogModule } from './sell-page/listing-details/listing-details.module';
import { PostedListingDetailsModule } from './sell-page/posted-listing-details/posted-listing-details.module';
import { SellPageModule } from './sell-page/sell-page.module';
import { SharedModule } from './shared/shared.module';
import { UploadDocumentsModule } from './upload-documents/upload-documents.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        GeoapifyGeocoderAutocompleteModule.withConfig(
          '1c550161c4074077b4fe42fd127d6139'
        )
      ],
      declarations: [AppComponent]
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
