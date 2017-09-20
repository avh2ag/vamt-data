import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorDetailComponent } from './competitor-detail.component';

describe('CompetitorDetailComponent', () => {
  let component: CompetitorDetailComponent;
  let fixture: ComponentFixture<CompetitorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
