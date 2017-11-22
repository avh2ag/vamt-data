import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CasesService } from '../cases.service';
import { Case } from '../../config/models';
import { CreateCaseComponent } from '../create-case/create-case.component';
@Component({
  selector: 'cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {
  public loading: boolean = false;
  public previewVisible: boolean = true;
  public allCases: Array<Case> = [];
  public activeCase: Case = null;
  dataChangedSubscription;
  constructor(private casesService: CasesService, private dialog: MatDialog) { }

  ngOnInit() {
  	this.loadCases();
    this.dataChangedSubscription = this.casesService.notifyDataChanged.subscribe(casesList => { 
      this.allCases = casesList;
      if (this.allCases.length > 0) {
        this.casesService.selectCase(this.allCases[0]);
      }
    });
  }

  showCreateDialog() {
    let dialogRef = this.dialog.open(CreateCaseComponent, {
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });  
  }

  loadCases() {
  	this.loading = true;
  	this.casesService.getAllCases().subscribe( (resp: Array<Case>) => {
  		this.onCasesResponse(resp);
  	}, err => { this.onLoadErr(err) }, () => { this.loading = false; });  	
  }

  onCasesResponse(resp: Array<Case>) {
  	this.allCases = resp;
  	if (this.allCases.length > 0) {
  		this.casesService.selectCase(this.allCases[0]);
  	}
  }

  onLoadErr(err) {
  	console.log(err);
  }

  hidePreview() {
    this.previewVisible = false;
  }

  showPreview() {
    this.previewVisible = true;
  }

}
