import { Component, OnInit, Input } from '@angular/core';
import { Competitor } from '../../config/models';
@Component({
  selector: 'competitor-preview',
  templateUrl: './competitor-preview.component.html',
  styleUrls: ['./competitor-preview.component.css']
})
export class CompetitorPreviewComponent implements OnInit {

  @Input() competitor: Competitor;
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
