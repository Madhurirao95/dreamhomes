import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageBodyComponent } from './home-page-body.component';

describe('HomePageBodyComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [HomePageBodyComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomePageBodyComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
