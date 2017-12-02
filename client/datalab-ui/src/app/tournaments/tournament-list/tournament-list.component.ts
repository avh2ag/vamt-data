import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateTournamentComponent } from '../create-tournament/create-tournament.component';
import { Tournament } from '../../config/models';
@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  public loading: boolean = false;
  public previewVisible: boolean = true;
  public allTournaments: Array<Tournament> = [];
  public createMode: boolean = false;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  showCreateForm() {
    this.createMode = true;
  }
  
  hideCreateForm() {
    this.createMode = false;
  }

  togglePreviewMode() {
    this.previewVisible = !this.previewVisible;
  }
}
