import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Competitor, Tournament, Element } from '../../config/models';
import { CompetitorsService } from '../competitors.service';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatCheckbox } from '@angular/material';

@Component({
  selector: 'competitor-detail',
  templateUrl: './competitor-detail.component.html',
  styleUrls: ['competitor-detail.component.css']
})
export class CompetitorDetailComponent implements OnInit {
  @Input() activeCompetitor: Competitor;  
  @ViewChild('competitorYear') year: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild(MatCheckbox) checkbox: MatCheckbox
  public editMode: boolean = false;
  constructor(private competitorsService: CompetitorsService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  enableEditMode(): void {
  	this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  deleteActiveCompetitor() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        label: this.activeCompetitor.name
      }
    });
    dialogRef.afterClosed().subscribe(decision => {
      if (decision) {
        this.competitorsService.deleteCompetitor(this.activeCompetitor.id).subscribe(resp => {
          //snackbar for successful deletion
        }, err => {
          //snackbar for error during delete
        });
      }
    });  
  }

  save(): void {
  	this.editMode = false;
    this.activeCompetitor.grad_year = this.year.nativeElement.value;
    this.activeCompetitor.name = this.name.nativeElement.value;
    this.activeCompetitor.active = this.checkbox.checked;
  	//call out to service to save competitor using id
    this.competitorsService.updateCompetitor(this.activeCompetitor).subscribe(resp => {
      console.log(resp);
    });
  }

}
