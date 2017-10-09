import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWitnessComponent } from './select-witness.component';

describe('SelectWitnessComponent', () => {
  let component: SelectWitnessComponent;
  let fixture: ComponentFixture<SelectWitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWitnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
