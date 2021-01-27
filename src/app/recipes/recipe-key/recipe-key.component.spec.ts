import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeKeyComponent } from './recipe-key.component';

describe('RecipeKeyComponent', () => {
  let component: RecipeKeyComponent;
  let fixture: ComponentFixture<RecipeKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
