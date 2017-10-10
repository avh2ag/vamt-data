import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../../config/models';

@Component({
  selector: 'cases-preview',
  templateUrl: './cases-preview.component.html',
  styleUrls: ['./cases-preview.component.css']
})
export class CasesPreviewComponent implements OnInit {
  @Input() case: Case;
  constructor() { }

  ngOnInit() {
  }

}
