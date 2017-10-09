import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Witness } from '../config/models';

@Injectable()
export class WitnessService {
	
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'witnesses';
  constructor(private http: Http) {}

  public getAllWitnesses() {
    return this.http.get(this._baseUrl).map(resp => {
      return resp.json();
    }).catch( err => {
      return err.json();
    });
  }

  // public createCase(caseData) {
  //   return this.http.post(this._baseUrl, {

  //   }).map(resp => {
  //     return resp.json();
  //   }).catch( err => {
  //     return err.json();
  //   });
  // }

}
