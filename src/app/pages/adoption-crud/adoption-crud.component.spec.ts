import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionCrudComponent } from './adoption-crud.component';

describe('AdoptionCrudComponent', () => {
  let component: AdoptionCrudComponent;
  let fixture: ComponentFixture<AdoptionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
