/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPageComponent } from './sell-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { ImageCarouselModule } from '../shared/image-carousel/image-carousel.module';
import { ListingDetailsDialogModule } from './listing-details/listing-details.module';
import { PostedListingDetailsModule } from './posted-listing-details/posted-listing-details.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => new Observable()
    };
  }
}

describe('SellPageComponent', () => {
  let component: SellPageComponent;
  let fixture: ComponentFixture<SellPageComponent>;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellPageComponent],
      imports: [
        SharedModule,
        ListingDetailsDialogModule,
        ImageCarouselModule,
        PostedListingDetailsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        AuthenticationService,
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    });

    authService = TestBed.inject(AuthenticationService);
    authService.isAuthorized$ = of(true);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
