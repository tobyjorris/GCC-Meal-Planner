import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingDistributionComponent } from './shopping-distribution.component';

describe('ShoppingDistributionComponent', () => {
  let component: ShoppingDistributionComponent;
  let fixture: ComponentFixture<ShoppingDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
