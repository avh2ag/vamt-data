import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { each } from 'lodash';
import * as moment from 'moment';
import { Env } from '../config/env';
import { Witness } from '../config/models';

@Injectable()
export class WitnessService {
  public loadedWitnesses: Array<Witness> = [];
  public notifyDataChanged: Subject<Witness[]> = new Subject();
  private _env: Env = new Env();
  private _baseUrl: string = this._env.getAPIHost() + 'witnesses/';
  constructor(private http: Http) {}

  public getAllWitnesses() {
    return this.http.get(this._baseUrl).map(resp => {
      this.loadedWitnesses = resp.json();
      this.notifyDataChanged.next(this.loadedWitnesses);
      return this.loadedWitnesses;
    }).catch( err => {
      return err.json();
    });
  }

  public createWitness(witnessName, witnessType) {
    return this.http.post(this._baseUrl, {
      witness_name: witnessName,
      witness_type: witnessType,
      headers: 'application/json'
    }).map(resp => {
      let createdWitness = resp.json();
      this.loadedWitnesses.push(createdWitness);
      this.notifyDataChanged.next(this.loadedWitnesses);
      return createdWitness;
    }).catch( err => {
      return err.json();
    });
  }

  public getWitnessById(id) {
    let endpoint = `${this._baseUrl}${id}`;
    return this.http.get(endpoint).map(resp => {
      return resp.json();
    }).catch(err => {
      return err.json();
    });
  }

  public getWitnessesFromIdList(idList) {
    let requestList = [];
    each(idList, id => {
      requestList.push(this.getWitnessById(id));
    });
    return Observable.forkJoin(requestList);
  }

}
