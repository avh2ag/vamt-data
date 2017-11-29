import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Team } from '../config/models';
@Injectable()
export class TeamsService {
  public loadedTeams: Array<Team> = [];
  public notifyDataChanged: Subject<Team[]> = new Subject();
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'teams/';
  constructor(private http: Http) { }

  public getAllTeams() {
    return this.http.get(this._baseUrl).map(resp => {
      console.log(resp.json())
      this.loadedTeams = resp.json();
      this.notifyDataChanged.next(this.loadedTeams);
      return this.loadedTeams;
    }).catch( err => {
      return err.json();
    });
  } 

  public createTeam(teamName) {
    return this.http.post(this._baseUrl, {
      team_name: teamName,
      headers: 'application/json'
    }).map(resp => {
      let createdTeam = resp.json();
      this.loadedTeams.push(createdTeam);
      this.notifyDataChanged.next(this.loadedTeams);
      return createdTeam;
    }).catch( err => {
      return err.json();
    });
  }
}
