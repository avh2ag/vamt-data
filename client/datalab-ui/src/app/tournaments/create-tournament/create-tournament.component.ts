import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @ViewChild(MatCheckbox) checkbox: MatCheckbox;
  public tourneyInfoForm: FormGroup;
  public singleTeamTourney: boolean = false;
  public tourneyInfoOpen: boolean = true;
  public team1 = {};
  public team2 = {}; //switch to team after input
  ngOnInit() {
    this.resetTourneyInfoForm();
  }

  resetTourneyInfoForm() {
    this.tourneyInfoForm = new FormGroup({
      'tournamentName': new FormControl(null, [Validators.required]),
      'tournamentDate': new FormControl(null, [Validators.required]),
    });
  }

  getAllCases() {
  	console.log("load all these, then get their witnesses")
  }
  //teamIndex 0 for team 1, 1 for team 2
  selectTeam(team, teamIndex) {
    console.log(team);
    if (teamIndex) {
      this.team2 = team;
    }
    else {
      this.team1 = team;
    }
  }

  deselectTeam(teamIndex) {
    if (teamIndex) {
      this.team2 = {};
    }
    else {
      this.team1 = {};
    }
  }

  cancel() {
  	this.dialogRef.close(false);
  }

}
