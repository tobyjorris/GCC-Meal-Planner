import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFieldComponent } from './simple-field.component';

describe('SimpleFieldComponent', () => {
  let component: SimpleFieldComponent;
  let fixture: ComponentFixture<SimpleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
