import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CasesService } from '../../cases/cases.service';
import { MAT_DIALOG_DATA, MatDialogRef, 
  MatDialog, MatCheckbox } from '@angular/material';
@Component({
  selector: 'create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateTournamentComponent>,
  	private casesService: CasesService) { }
  @ViewChild(MatCheckbox) checkbox: MatCheckbox
  public singleTeamTourney: boolean = false;
  public team1 = {};
  public team2 = {};
  ngOnInit() {
  }

  getAllCases() {
  	console.log("load all these, then get their witnesses")
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
