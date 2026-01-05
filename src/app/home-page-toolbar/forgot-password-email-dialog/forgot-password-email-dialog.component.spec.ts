import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordEmailDialogComponent } from './forgot-password-email-dialog.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordEmailDialogComponent;
  let fixture: ComponentFixture<ForgotPasswordEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordEmailDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
