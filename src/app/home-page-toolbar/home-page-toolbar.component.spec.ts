import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageToolBarComponent } from './home-page-toolbar.component';

describe('HomePageToolBarComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [HomePageToolBarComponent]
  }));

  it('should create the Home Page Toolbar component', () => {
    const fixture = TestBed.createComponent(HomePageToolBarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
