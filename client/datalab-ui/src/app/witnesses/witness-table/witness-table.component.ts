import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { concat, each } from 'lodash';
import { Case, Witness } from '../../config/models';
import { WitnessService } from '../witness.service';
import { CasesService } from '../../cases/cases.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import * as moment from 'moment';
@Component({
  selector: 'witness-table',
  templateUrl: './witness-table.component.html',
  styleUrls: ['./witness-table.component.css']
})
export class WitnessTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  witnessDatabase: WitnessDatabase | null;
  witnessDatasource: WitnessDataSource | null;
  allWitnesses: Array<Witness> = [];
  defaultPageIndex = 0;
  defaultPageSize = 25;
  pageIndex = 0;
  pageSize = 25;
  totalResults = 0;
  pageSizeOptions: Array<Number> = [10, 25, 50, 100];
  displayedColumns = ['side', 'witness_name'];
  updateDataSubscription;
  constructor(private witnessService: WitnessService, private casesService: CasesService) { }

  ngOnInit() {
    this.loadDb();
    this.updateDataSubscription = this.casesService.notifyActiveCaseChanged.subscribe((data: Case) => {
      this.loadWitnesses(data);
    }); 
    this.loadWitnesses(this.casesService.activeCase);
  }


  getWitnessesByIds(idList, side) {
   	this.witnessService.getWitnessesFromIdList(idList).subscribe(witnessList => {
   		each(witnessList, witness => {
         witness["side"] = side;
         this.allWitnesses.push(witness);
       });
       this.loadDb();
   		//callback etnereting data into datasource with designated side
   	}, err => {
   		console.log(err);
       return [];
   	});
  }

  loadWitnesses(caseToLoad) { 
    this.allWitnesses = [];
    this.getWitnessesByIds(caseToLoad.p_witnesses, 'P');
    this.getWitnessesByIds(caseToLoad.d_witnesses, 'D');
    this.getWitnessesByIds(caseToLoad.swing_witnesses, 'Swing');
  }

  loadDb() {
    this.resetPagination();
    this.witnessDatabase = new WitnessDatabase(this.allWitnesses);
    this.witnessDatasource = new WitnessDataSource(this.witnessDatabase, this.sort);    
  }

  resetPagination() {
    this.totalResults = this.allWitnesses.length;
    this.pageIndex = this.defaultPageIndex;
    this.pageSize = this.defaultPageSize;
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class WitnessDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(witnesses) {
    each(witnesses, witness => {
      this.addWitness(witness);
    });
  }

  /** Adds a new user to the database. */
  addWitness(witness) {
    const copiedData = this.data.slice(); 
    copiedData.push(witness);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, WitnessDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class WitnessDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  public total: Number = 0;
  constructor(private _witnessDatabase: WitnessDatabase, private _sort: MatSort,
   ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Witness[]> {
    const displayDataChanges = [
      this._witnessDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData().slice().filter((item:Witness) => {
        let searchStr = JSON.stringify(item).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
      this.total = data.length;
      
      return data;
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Witness[] {
    const data = this._witnessDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: any = '';
      let propertyB: any = '';

      switch (this._sort.active) {
        //case 'witness': [propertyA, propertyB] = [a.witness.witness_name, b.witness.witness_name]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
