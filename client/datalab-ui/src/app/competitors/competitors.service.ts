import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import { each } from 'lodash';
import * as moment from 'moment';

import { Env } from '../config/env';
@Injectable()
export class CompetitorsService {
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'competitors/';
  public loading: boolean = false;

  constructor(private http: Http) {}

  public getAllCompetitors() {
    this.loading = true;
    return this.http.get(this._baseUrl).map(resp => {
      return resp.json();
    }).catch( err => {
      return err.json();
    }).finally(()=> {
      this.loading = false;
    });
  }

}
