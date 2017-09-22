import { Component, OnInit, Input } from '@angular/core';
import { Competitor } from '../../config/models';
@Component({
  selector: 'competitor-preview',
  templateUrl: './competitor-preview.component.html',
  styleUrls: ['./competitor-preview.component.css']
})
export class CompetitorPreviewComponent implements OnInit {

  @Input() competitor: Competitor;
  constructor() { }

  ngOnInit() {
  }


}
