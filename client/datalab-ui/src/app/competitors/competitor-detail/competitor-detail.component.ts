import { Component, OnInit, Input } from '@angular/core';
import { Competitor, Tournament, Element } from '../../config/models';
@Component({
  selector: 'competitor-detail',
  templateUrl: './competitor-detail.component.html',
  styleUrls: ['competitor-detail.component.css']
})
export class CompetitorDetailComponent implements OnInit {
  @Input() activeCompetitor: Competitor;  
  public editMode: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  enableEditMode(): void {
  	this.editMode = true;
  }

  save(): void {
  	this.editMode = false;
  	//call out to service to save competitor using id
  }

}
