import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CompetitorsService } from '../competitors.service';
import { CreateCompetitorComponent } from '../create-competitor/create-competitor.component';
import { Competitor } from '../../config/models';
@Component({
  selector: 'competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.css']
})
export class CompetitorListComponent implements OnInit {

  constructor(private competitorsService: CompetitorsService, private dialog: MatDialog) { }
  public allCompetitors: Array<Competitor> = [];
  public loading: boolean = false;
  public activeCompetitor: Competitor;
  public previewVisible: boolean = true;
  competitorSubscription;
  ngOnInit() {
  	this.loadCompetitors();
    this.allCompetitors = this.competitorsService.loadedCompetitors;
    this.competitorSubscription = this.competitorsService.notifyDataChanged.subscribe((competitors: Array<Competitor>) =>{
      this.allCompetitors = competitors;
    });
  }

  showCreateDialog() {
    let dialogRef = this.dialog.open(CreateCompetitorComponent, {
      height: '500px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });  
  }

  loadCompetitors() {
  	this.loading = true;
  	this.competitorsService.getAllCompetitors().subscribe((competitors: Array<Competitor>) => {
      this.onCompetitorsLoad(competitors);
  	}, err => { console.log(err); this.activeCompetitor = null; }, () => { this.loading = false; });
  }

  onCompetitorsLoad(competitorList: Array<Competitor>): void {
      this.allCompetitors = competitorList;
      if (this.allCompetitors.length > 0) {
        this.selectCompetitor(this.allCompetitors[0]);
      }
      
  }

  selectCompetitor(competitor: Competitor): void {
    this.activeCompetitor = competitor;
    this.competitorsService.activeCompetitorChanged.next(this.activeCompetitor);
  }

  isSelectedCompetitor(competitor: Competitor): boolean {
    return this.activeCompetitor.id == competitor.id;
  }

  hidePreview() {
    this.previewVisible = false;
  }

  showPreview() {
    this.previewVisible = true;
  }

}
