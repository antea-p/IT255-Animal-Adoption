import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCrudComponent } from './animal-crud.component';

describe('AnimalCrudComponent', () => {
  let component: AnimalCrudComponent;
  let fixture: ComponentFixture<AnimalCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
