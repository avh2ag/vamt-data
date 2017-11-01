import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each, remove } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Competitor } from '../config/models';

@Injectable()
export class CompetitorsService {
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'competitors/';
  public activeCompetitor: Competitor;
  public activeCompetitorChanged: Subject<Competitor> = new Subject();
  public loadedCompetitors: Array<Competitor> = [];
  public notifyDataChanged: Subject<Competitor[]> = new Subject();
  constructor(private http: Http) {}

  public getAllCompetitors() {
    return this.http.get(this._baseUrl).map(resp => {
      this.loadedCompetitors = resp.json();
      this.notifyDataChanged.next(this.loadedCompetitors);
      return this.loadedCompetitors;
    }).catch( err => {
      return err.json();
    });
  }

  public updateCompetitor(competitor: Competitor) {
    let url = `${this._baseUrl}${competitor.id}/`;
    return this.http.put(url, {
      competitor: competitor
    }).map(resp => {
      return resp.json();
    }).catch(err => {
      return err.json();
    });
  }

  public createCompetitor(competitorData) {
    
  }

  public deleteCompetitor(competitorId: Number) {
    let endpoint = this._baseUrl + competitorId;
    remove(this.loadedCompetitors, competitor => {
      return competitor.id === competitorId;
    });
    return this.http.delete(endpoint).map(resp => {
      this.notifyDataChanged.next(this.loadedCompetitors);
      return resp.json(); 
    }).catch(err => { return err.json(); });
  }

}
