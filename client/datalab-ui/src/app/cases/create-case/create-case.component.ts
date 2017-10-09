import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CasesService } from '../cases.service';
import { Case, Witness, Competitor } from '../../config/models';

@Component({
  selector: 'create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent implements OnInit {
  caseForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateCaseComponent>,
  	casesService: CasesService ) { }

  ngOnInit() {
  	this.onFormReset();
  }
  
  onFormReset() {
    this.caseForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
    });
  }

  createCase() {
  	//this.casesService.createCase();
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
