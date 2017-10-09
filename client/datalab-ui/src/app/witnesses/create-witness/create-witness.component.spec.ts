import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWitnessComponent } from './create-witness.component';

describe('CreateWitnessComponent', () => {
  let component: CreateWitnessComponent;
  let fixture: ComponentFixture<CreateWitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWitnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
