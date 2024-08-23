import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPerCountryComponent } from './details-per-country.component';

describe('DetailsPerCountryComponent', () => {
  let component: DetailsPerCountryComponent;
  let fixture: ComponentFixture<DetailsPerCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPerCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPerCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
