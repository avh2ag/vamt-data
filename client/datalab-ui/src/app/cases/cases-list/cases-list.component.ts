import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CasesService } from '../cases.service';
import { Case } from '../../config/models';
import { CreateCaseComponent } from '../create-case/create-case.component';
@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {
  public loading: boolean = false;
  public previewVisible: boolean = true;
  public cases: Array<Case> = [];
  public activeCase: Case = null;

  constructor(private casesService: CasesService, private dialog: MatDialog) { }

  ngOnInit() {
  	this.loadCases();
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
  	this.cases = resp;
  	if (this.cases.length > 0) {
  		this.activeCase = this.cases[0];
  	}
  }

  selectCase(newCase: Case) {
  	this.activeCase = newCase;
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
