import { Component, OnInit } from '@angular/core';
import { WitnessService } from '../witness.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'create-witness',
  templateUrl: './create-witness.component.html',
  styleUrls: ['./create-witness.component.css']
})
export class CreateWitnessComponent implements OnInit {
  witnessForm: FormGroup;
  constructor(private snackBar: MatSnackBar, private witnessService: WitnessService) { }
  witnessTypes: ['Character', 'Defendant', 'Expert', 'Crying', 'Cop'];
  ngOnInit() {
  	this.onFormReset();
  }

  onFormReset() {
  	this.witnessForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
    });
  }

  createWitness() {
  	let witnessName = this.witnessForm.value.name;
  	let witnessType = this.witnessForm.value.type;
  	this.witnessService.createWitness(witnessName, witnessType).subscribe(resp => {
  		let message = `${witnessName} created.`;
  		this.snackBar.open(message, "", {duration: 2500});
  		this.onFormReset();
  	}, err => {
  		console.log(err);
  		let message = `Error creating ${witnessName}`;
  		this.snackBar.open(message, "", {duration: 2500});
  	});  	
  }

}
