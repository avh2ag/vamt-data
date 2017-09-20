import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CompetitorsService } from '../competitors.service';

@Component({
  selector: 'competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.css']
})
export class CompetitorListComponent implements OnInit {

  constructor(private competitorsService: CompetitorsService) { }

  ngOnInit() {
  	console.log("On init?")
  	this.competitorsService.getAllCompetitors().subscribe(competitors => {
  		console.log(competitors);
  	});
  }

}
