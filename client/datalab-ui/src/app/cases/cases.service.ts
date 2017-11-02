import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each, remove } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Case } from '../config/models';

@Injectable()
export class CasesService {
  public allCases: Array<Case> = [];
  public notifyDataChanged: Subject<Case[]> = new Subject();
  public notifyActiveCaseChanged: Subject<Case> = new Subject();
  public activeCase: Case = null;
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'cases/';
  constructor(private http: Http) {}

  public getAllCases() {
    return this.http.get(this._baseUrl).map(resp => {
      this.allCases = resp.json();
      this.notifyDataChanged.next(this.allCases);
      return resp.json();
    }).catch( err => {
      return err.json();
    });
  }

  public createCase(caseData) {
    return this.http.post(this._baseUrl, {
      case_name: caseData["name"],
      case_type: caseData["type"],
      case_year: caseData["year"],
      p_witnesses: caseData["p_wit"],
      d_witnesses: caseData["d_wit"],
      swing_witnesses: caseData["s_wit"]
    }).map(resp => {
      let createdCase = resp.json();
      this.allCases.push(createdCase);
      this.notifyDataChanged.next(this.allCases);
      return createdCase;
    }).catch( err => {
      return err.json();
    });
  }

  public deleteCase(caseId: Number) {
    let endpoint = this._baseUrl + caseId;
    remove(this.allCases, potentialCase => {
      return potentialCase.id === caseId;
    });    
    return this.http.delete(endpoint).map(resp => {
      this.notifyDataChanged.next(this.allCases);
      return resp.json();
    }).catch( err => {
      return err.json();
    });
  }


}
