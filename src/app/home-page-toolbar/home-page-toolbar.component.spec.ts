/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageToolBarComponent } from './home-page-toolbar.component';
import { AuthenticationService } from '../services/authentication-service';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogModule } from '../shared/dialog/dialog.module';
import { SharedModule } from '../shared/shared.module';
import { SignInDialogContentModule } from './signIn-dialog/signIn-dialog-content.module';

class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => new Observable()
    };
  }
}

class RouterMock {
  // Mock the navigate method
  navigate = jasmine.createSpy('navigate');
}

describe('HomePageToolBarComponent', () => {
  let component: HomePageToolBarComponent;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let fixture: ComponentFixture<HomePageToolBarComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
      'getEmail'
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DialogModule, SharedModule, SignInDialogContentModule],
      declarations: [HomePageToolBarComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useClass: RouterMock }
      ]
    }).compileComponents();

    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;

    authService.isAuthorized$ = of(false);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Home Page Toolbar component', () => {
    expect(component).toBeTruthy();
  });
});
