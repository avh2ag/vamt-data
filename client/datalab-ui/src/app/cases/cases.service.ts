import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Case } from '../config/models';

@Injectable()
export class CasesService {
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'cases';
  constructor(private http: Http) {}

  public getAllCases() {
    return this.http.get(this._baseUrl).map(resp => {
      return resp.json();
    }).catch( err => {
      return err.json();
    });
  }

  public createCase(caseData) {
    
  }


}
