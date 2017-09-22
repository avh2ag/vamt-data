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
  public loading: boolean = false;
  public activeCompetitor: Competitor;
  ngOnInit() {
  	this.loadCompetitors();

  }

  loadCompetitors() {
  	this.loading = true;
  	this.competitorsService.getAllCompetitors().subscribe((competitors: Array<Competitor>) => {
  		competitors[0].active = true;
  		this.competitors = competitors;
      this.selectCompetitor(this.competitors[0]);
  	}, err => { console.log(err); this.activeCompetitor = null; }, () => { this.loading = false; });
  }

  selectCompetitor(competitor: Competitor): void {
    this.activeCompetitor = competitor;
    console.log(this.activeCompetitor);
  }

  isSelectedCompetitor(competitor: Competitor): boolean {
    return this.activeCompetitor.id == competitor.id;
  }

}
