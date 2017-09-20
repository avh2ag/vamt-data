import { Component, OnInit, Input } from '@angular/core';
import { Competitor } from '../../config/models';
@Component({
  selector: 'competitor-detail',
  templateUrl: './competitor-detail.component.html',
  styleUrls: ['./competitor-detail.component.css']
})
export class CompetitorDetailComponent implements OnInit {
  @Input() competitor: Competitor;
  constructor() { }

  ngOnInit() {
  }

}
