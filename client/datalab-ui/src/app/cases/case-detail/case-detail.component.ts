import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../../config/models';
import { CasesService } from '../cases.service';

@Component({
  selector: 'case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  @Input() case: Case;
  editMode: boolean = false;
  constructor(private casesService: CasesService) { }

  ngOnInit() {
  }

  enableEditMode(): void {
  	this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }  

  save() {

  }
}
