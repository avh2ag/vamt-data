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
  p_witnesses: Array<Witness> = [];
  d_witnesses: Array<Witness> = [];
  swing_witnesses: Array<Witness> = [];
  createWitness: boolean = false;
  witnessSubscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateCaseComponent>,
  	private casesService: CasesService, private witnessService: WitnessService ) { }

  ngOnInit() {
  	this.onFormReset();
    this.allWitnesses = this.witnessService.loadedWitnesses;
    this.witnessSubscription = this.witnessService.notifyDataChanged.subscribe((witnesses: Array<Witness>) => {
      this.allWitnesses = witnesses;
    });
  	this.loadWitnesses();
  }

  loadWitnesses() {
  	this.witnessService.getAllWitnesses().subscribe((witnesses: Array<Witness>) => {
      this.allWitnesses = witnesses;
    });
  }

  onFormReset() {
    this.caseForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
      'year': new FormControl(null, [Validators.required])
    });
  }

  showCreateWitness() {
    this.createWitness = true;
  }

  hideCreateWitness() {
    this.createWitness = false;
  }

  createCase() {
  	//this.casesService.createCase();
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
