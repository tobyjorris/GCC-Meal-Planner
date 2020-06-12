import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingPrintModalComponent } from './shopping-print-modal.component';

describe('ShoppingPrintModalComponent', () => {
  let component: ShoppingPrintModalComponent;
  let fixture: ComponentFixture<ShoppingPrintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingPrintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingPrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
