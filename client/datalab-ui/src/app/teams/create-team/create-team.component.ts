import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
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
  public options: Array<Competitor> = [];
  public filteredOptions: Observable<Competitor[]>;
  public competitorSubscription;
  ngOnInit() {
  	this.options = this.competitorsService.loadedCompetitors;
  	this.competitorSubscription = this.competitorsService.notifyDataChanged.subscribe((competitors: Array<Competitor>) => {
  		this.options = competitors;
  		console.log(this.options);
  	});
  	if (this.options.length == 0) {
  		this.loadCompetitors();
  	}
  	this.teamForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null, [Validators.required]),
    });
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

  createTeam() {

  }

  addCompetitor() {

  }

}
