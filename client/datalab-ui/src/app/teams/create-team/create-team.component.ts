import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TeamsService } from '../teams.service';
import { CompetitorsService } from '../../competitors/competitors.service';
import { Competitor, Team } from '../../config/models';
import { findIndex, map } from 'lodash';
@Component({
  selector: 'create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor(private teamsService: TeamsService, private competitorsService: CompetitorsService) { }
  @Output() onComplete = new EventEmitter<any>();
  public teamForm: FormGroup;
  public competitorControl = new FormControl();
  public options: Array<Competitor> = [];
  public filteredOptions: Observable<Competitor[]>;
  public selectedCompetitors: Array<Competitor> = [];
  public competitorSubscription;
  ngOnInit() {
  	this.options = this.competitorsService.loadedCompetitors;
  	this.competitorSubscription = this.competitorsService.notifyDataChanged.subscribe((competitors: Array<Competitor>) => {
  		this.options = competitors;
  	});
  	if (this.options.length == 0) {
  		this.loadCompetitors();
  	}
  	this.onFormReset();
    this.filteredOptions = this.competitorControl.valueChanges
        .startWith(null)
        .map(competitor => competitor && typeof competitor === 'object' ? competitor.name : competitor)
        .map(name => name ? this.filter(name) : this.options.slice());
  }

  loadCompetitors() {
  	this.competitorsService.getAllCompetitors().subscribe(resp => {}, err => {
  		// Make this a Snackbar later
  		console.log("unable to get competitors")
  	})
  }

  filter(name: string): Competitor[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(competitor: Competitor): string {
    return competitor ? competitor.name : "";
  }

  onFormReset() {
  	this.teamForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
    });
  }

  createTeam() {
  	let competitorIds = map(this.selectedCompetitors, 'id');
  	this.teamsService.createTeam(this.teamForm.value.name, competitorIds).subscribe(resp => {
  		console.log(resp);
  		this.onFormReset();
  		this.exit();
  	},
  	 err => {
  	 	console.log(err);
  	 });
  }

  exit() {
  	this.onComplete.emit(null);
  }

  addCompetitor() {
  	if (!this.competitorControl.value.id) {
  		this.competitorControl.setValue(null);
  		return;
  	}
  	let index = findIndex(this.selectedCompetitors, competitor => {
  		return competitor.id === this.competitorControl.value.id;
  	}); 
  	if ( index < 0 ){
  		this.selectedCompetitors.push(this.competitorControl.value);  		
  	}
  	this.competitorControl.setValue(null);
  }

  removeCompetitor(competitorId) {
  	let index = findIndex(this.selectedCompetitors, competitor => {
  		return competitor.id == competitorId;
  	});
  	if (index >= 0) {
  		console.log("splicing?")
  		this.selectedCompetitors.splice(index, 1);
  	}
  }

}
