/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

describe('DialogComponent', () => {
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;
  beforeEach(() => {
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ChangeDetectorRef, useValue: cdrSpy }
      ]
    });

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
    MatDialogRef<DialogComponent>
    >;
    changeDetectorRefSpy = TestBed.inject(
      ChangeDetectorRef
    ) as jasmine.SpyObj<ChangeDetectorRef>;
  });

  it('should create the Dialog component', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
