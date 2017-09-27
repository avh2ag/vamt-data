import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Competitor, Tournament, Element } from '../../config/models';
@Component({
  selector: 'competitor-detail',
  templateUrl: './competitor-detail.component.html',
  styleUrls: ['competitor-detail.component.css']
})
export class CompetitorDetailComponent implements OnInit {
  @Input() activeCompetitor: Competitor;  
  @ViewChild('competitorYear') year: ElementRef;
  @ViewChild('firstName') firstName: ElementRef;
  public editMode: boolean = false;
  constructor() { }

  ngOnInit() {
    this.year.nativeElement.value = this.activeCompetitor.grad_year;
    this.firstName.nativeElement.value = this.activeCompetitor.name;
  }

  enableEditMode(): void {
  	this.editMode = true;
  }

  save(): void {
  	this.editMode = false;
  	//call out to service to save competitor using id
  }

}
