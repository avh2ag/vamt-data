import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesPreviewComponent } from './cases-preview.component';

describe('CasesPreviewComponent', () => {
  let component: CasesPreviewComponent;
  let fixture: ComponentFixture<CasesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
