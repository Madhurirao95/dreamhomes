/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedListingDetailsComponent } from './posted-listing-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { SellPageService } from 'src/app/services/sell-page-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => new Observable()
    };
  }
}

describe('PostedListingDetailsComponent', () => {
  let component: PostedListingDetailsComponent;
  let fixture: ComponentFixture<PostedListingDetailsComponent>;
  let authService: AuthenticationService;
  let sellPageService: jasmine.SpyObj<SellPageService>;

  beforeEach(() => {
    const sellPageServiceSpy = jasmine.createSpyObj('SellPageService', [
      'getAllListing'
    ]);

    TestBed.configureTestingModule({
      declarations: [PostedListingDetailsComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        AuthenticationService,
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: SellPageService, useValue: { getAllListing: () => of([]) } }
      ]
    });

    authService = TestBed.inject(AuthenticationService);
    sellPageService = TestBed.inject(
      SellPageService
    ) as jasmine.SpyObj<SellPageService>;

    authService.isAuthorized$ = of(true);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
