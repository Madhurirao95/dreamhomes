import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageDialogComponent } from './error-message-dialog.component';
import { SharedModule } from '../shared.module';

describe('ErrorMessageDialogComponent', () => {
  let component: ErrorMessageDialogComponent;
  let fixture: ComponentFixture<ErrorMessageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ErrorMessageDialogComponent]
    });
    fixture = TestBed.createComponent(ErrorMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
