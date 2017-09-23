import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Element, Competitor } from '../../config/models';
import { DataSource } from '@angular/cdk/collections';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { each } from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { CompetitorsService } from '../../competitors/competitors.service';
@Component({
  selector: 'element-table',
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.css']
})
export class ElementTableComponent implements OnInit {
  @Input() elementsList: Array<Element>; 
  elementsDatabase;
  dataSource: ElementsDataSource | null;
  displayedColumns = ['competitor_name', 'witness_name'];
  updateDataSubscription;
// export class Element {
// 	constructor() {};
// 	public tournament: Tournament;
// 	public score: Score;
// 	public id: Number;
// 	public side: string;
// 	public category: string;
// 	public witness_type: string;
// 	public role_type: string;
// 	public element_date;
// 	public round: Number;
// 	public opponent: string;
// 	public witness_name: string;
// 	public competitor_name: string;

// }

  constructor(private competitorsService: CompetitorsService) { }

  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
  	this.loadDb();
    this.displayedColumns = ['date', 'side', 'category', 'witness_name',
    	'z_score', 'raw_score', ];
    this.updateDataSubscription = this.competitorsService.activeCompetitorChanged.subscribe((competitor: Competitor) => {
    	this.elementsList = competitor.elements;
    	this.loadDb();
    });
  }

  loadDb() {
  	this.elementsDatabase = new ElementsDatabase(this.elementsList);
    this.dataSource = new ElementsDataSource(this.elementsDatabase, this.sort);
  }

  onClickRow(row) {
  	console.log(row);
  }

  onDoubleClick(row) {

  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class ElementsDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
  get data(): Element[] { return this.dataChange.value; }

  constructor(elements: Array<Element>) {
    // Fill up the database with 100 users.
    each(elements, (elem) => {
    	this.addElement(elem);
    });
    console.log(this.data.slice());
  }

  /** Adds a new user to the database. */
  addElement(elem) {
    const copiedData = this.data.slice(); 
    copiedData.push(elem);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ElementsDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ElementsDataSource extends DataSource<any> {
  constructor(private _elementsDatabase: ElementsDatabase, private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const displayDataChanges = [
      this._elementsDatabase.dataChange,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Element[] {
    const data = this._elementsDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        // case 'userId': [propertyA, propertyB] = [a.id, b.id]; break;
        // case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
        // case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
        // case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
