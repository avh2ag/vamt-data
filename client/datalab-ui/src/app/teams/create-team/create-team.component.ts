import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { TeamsService } from '../teams.service';
import { CompetitorsService } from '../../competitors/competitors.service';
import { Competitor, Team } from '../../config/models';
@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor(private teamsService: TeamsService, private competitorsService: CompetitorsService) { }
  public teamForm: FormGroup;
  public competitorControl = new FormControl();
  public allCompetitors: Array<Competitor> = [];
  public competitorSubscription;
  ngOnInit() {
  	this.allCompetitors = this.competitorsService.loadedCompetitors;
  	this.competitorSubscription = this.competitorsService.notifyDataChanged.subscribe((competitors: Array<Competitor>) => {
  		this.allCompetitors = competitors;
  		console.log(this.allCompetitors);
  	});
  	this.loadCompetitors();
  	this.teamForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
    });
  }

  loadCompetitors() {
  	this.competitorsService.getAllCompetitors().subscribe(resp => {}, err => {
  		// Make this a Snackbar later
  		console.log("unable to get competitors")
  	})
  }

  createTeam() {

  }

  addCompetitor() {

  }

}
