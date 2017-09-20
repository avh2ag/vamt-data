import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CompetitorsService } from '../competitors.service';
import { Competitor } from '../../config/models';

@Component({
  selector: 'competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.css']
})
export class CompetitorListComponent implements OnInit {

  constructor(private competitorsService: CompetitorsService) { }
  public competitors: Array<Competitor> = [];
  ngOnInit() {
  	this.loadCompetitors();

  }

  loadCompetitors() {
  	this.competitorsService.getAllCompetitors().subscribe(competitors => {
  		this.competitors = competitors;
  	});
  }

}
