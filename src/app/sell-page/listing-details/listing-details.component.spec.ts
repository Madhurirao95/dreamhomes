/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsDialogComponent } from './listing-details.component';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SellPageService } from 'src/app/services/sell-page-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadDocumentsModule } from 'src/app/upload-documents/upload-documents.module';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { MaxDigitsDirective } from 'src/app/shared/directives/max-digits-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => new Observable()
    };
  }
}

describe('ListingDetailsDialogComponent', () => {
  let component: ListingDetailsDialogComponent;
  let fixture: ComponentFixture<ListingDetailsDialogComponent>;
  let formBuilder: jasmine.SpyObj<FormBuilder>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let sellPageService: jasmine.SpyObj<SellPageService>;

  beforeEach(async () => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['setIsAuthorized']);

    await TestBed.configureTestingModule({
      imports: [SharedModule, UploadDocumentsModule, BrowserAnimationsModule, GeoapifyGeocoderAutocompleteModule.withConfig('1c550161c4074077b4fe42fd127d6139')],
      declarations: [ListingDetailsDialogComponent, MaxDigitsDirective],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: FormBuilder, useValue: formBuilderSpy },
        { provide: SellPageService, useValue: sellPageService }
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;

    const mockFormGroup = new FormGroup({
      type: new FormControl('', []),
      streetAddress: new FormControl('', []),
      unit: new FormControl('', []),
      zipCode: new FormControl('', []),
      city: new FormControl('', []),
      state: new FormControl('', []),
      price: new FormControl('', []),
      area: new FormControl('', []),
      contactNumber: new FormControl('', []),
      description: new FormControl('', []),
      features: new FormControl('', [])
    });

    formBuilder.group.and.returnValue(mockFormGroup);
    authService.isAuthorized$ = of(true);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
