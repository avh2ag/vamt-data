import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { CasesService } from '../cases.service';
import { WitnessService } from '../../witnesses/witness.service';
import { Case, Witness, Competitor } from '../../config/models';

@Component({
  selector: 'create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent implements OnInit {
  caseForm: FormGroup;
  allWitnesses: Array<Witness> = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateCaseComponent>,
  	private casesService: CasesService, private witnessService: WitnessService ) { }

  ngOnInit() {
  	this.onFormReset();
  	this.loadWitnesses();
  }

  loadWitnesses() {
  	this.witnessService.getAllWitnesses().subscribe(witnesses => {
  		this.allWitnesses = witnesses;
  	}, err => {
  		console.log(err);
  	});
  }

  onFormReset() {
    this.caseForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'year': new FormControl(null, [Validators.required])
    });
  }

  createCase() {
  	//this.casesService.createCase();
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
