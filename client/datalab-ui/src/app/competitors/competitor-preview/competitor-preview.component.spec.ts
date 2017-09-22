import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorPreviewComponent } from './competitor-preview.component';

describe('CompetitorPreviewComponent', () => {
  let component: CompetitorPreviewComponent;
  let fixture: ComponentFixture<CompetitorPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
