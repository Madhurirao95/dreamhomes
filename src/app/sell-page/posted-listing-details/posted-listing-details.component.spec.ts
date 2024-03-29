import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedListingDetailsComponent } from './posted-listing-details.component';

describe('PostedListingDetailsComponent', () => {
  let component: PostedListingDetailsComponent;
  let fixture: ComponentFixture<PostedListingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostedListingDetailsComponent]
    });
    fixture = TestBed.createComponent(PostedListingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
