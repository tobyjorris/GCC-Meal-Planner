import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailDisplayComponent } from './recipe-detail-display.component';

describe('RecipeDetailDisplayComponent', () => {
  let component: RecipeDetailDisplayComponent;
  let fixture: ComponentFixture<RecipeDetailDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
