import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Team } from '../../config/models';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'select-teams',
  templateUrl: './select-teams.component.html',
  styleUrls: ['./select-teams.component.css']
})
export class SelectTeamsComponent implements OnInit {
  @Output() onSelect = new EventEmitter<Team>();	
  teamsSubscription;
  teamsControl = new FormControl();
  options: Array<Team> = [];
  filteredOptions: Observable<Team[]>;
  constructor(private teamsService: TeamsService) { }
  //set the subscriptions, maybe make a team or two.
  ngOnInit() {
  	this.teamsSubscription = this.teamsService.notifyDataChanged.subscribe((teams: Team[]) => {
  		this.options = teams;
  	});
  	this.loadTeams();
  	this.filteredOptions = this.teamsControl.valueChanges
        .startWith(null)
        .map(team => team && typeof team === 'object' ? team.team_name : team)
        .map(name => name ? this.filter(name) : this.options.slice());
  }

  loadTeams () {
  	this.teamsService.getAllTeams().subscribe(resp => {

  	}, err => {	
  		console.log("error loading teams");
  	});
  }

  displayFn(team: Team): string {
  	return team ? team.team_name : "";
  }

  addTeam() {
  	console.log(this.teamsControl.value);
  	this.onSelect.emit(this.teamsControl.value);
  	this.teamsControl.setValue(null);  	
  }

  filter(name: string): Team[] {
    return this.options.filter(option =>
      option.team_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }  

}
