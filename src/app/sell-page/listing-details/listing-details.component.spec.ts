/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDetailsDialogComponent } from './listing-details.component';

describe('ListingDetailsDialogComponent', () => {
  let component: ListingDetailsDialogComponent;
  let fixture: ComponentFixture<ListingDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListingDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(ListingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
