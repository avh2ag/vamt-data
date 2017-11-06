import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../../config/models';
import { CasesService } from '../cases.service';

@Component({
  selector: 'cases-preview',
  templateUrl: './cases-preview.component.html',
  styleUrls: ['./cases-preview.component.css']
})
export class CasesPreviewComponent implements OnInit {
  @Input() case: Case;
  constructor(private casesService: CasesService) { }

  ngOnInit() {
  }

  selectCase() {
  	console.log("what in the world");
  	this.casesService.selectCase(this.case);
  }

}
