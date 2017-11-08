import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
  }

}
