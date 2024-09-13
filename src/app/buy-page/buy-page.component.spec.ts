import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BuyPageComponent } from './buy-page.component';
import { SharedModule } from '../shared/shared.module';

describe('BuyPageComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, SharedModule],
    declarations: [BuyPageComponent]
  }));

  it('should create', () => {
    // ARRANGE & ACT
    const fixture = TestBed.createComponent(BuyPageComponent);
    const app = fixture.componentInstance;

    // ASSERT
    expect(app).toBeTruthy();
  });
});
