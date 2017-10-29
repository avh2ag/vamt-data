import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Element, Competitor } from '../../config/models';
import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { each } from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import * as moment from 'moment';
import { CompetitorsService } from '../../competitors/competitors.service';
@Component({
  selector: 'element-table',
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.css']
})
export class ElementTableComponent implements OnInit {
  @Input() elementsList: Array<Element>; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  elementsDatabase: ElementsDatabase | null;
  dataSource: ElementsDataSource | null;
  displayedColumns = [];
  updateDataSubscription;
  totalResults: Number = 0;
  defaultPageIndex = 0;
  defaultPageSize = 25;
  pageIndex = 0;
  pageSize = 25;
  keyword = "";
  pageSizeOptions: Array<Number> = [10, 25, 50, 100];

  constructor(private competitorsService: CompetitorsService) { }

  ngOnInit() {	
    this.displayedColumns = ['date', 'side', 'role_type', 'category', 'witness_name',
    	'z_score', 'raw_score', ];
    this.updateDataSubscription = this.competitorsService.activeCompetitorChanged.subscribe((competitor: Competitor) => {
    	this.elementsList = competitor.elements;
    	this.loadDb();
    });
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
          this.totalResults = this.dataSource.total;
        });
    this.loadDb();

  }

  loadDb() {
  	this.resetPagination();
  	this.elementsDatabase = new ElementsDatabase(this.elementsList);
    this.dataSource = new ElementsDataSource(this.elementsDatabase, this.sort, this.paginator);
  }

  resetPagination() {
  	this.totalResults = this.elementsList.length;
  	this.pageIndex = this.defaultPageIndex;
  	this.pageSize = this.defaultPageSize;
  }

  public onPageEvent($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadDb();
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
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }
  public total: Number = 0;
  constructor(private _elementsDatabase: ElementsDatabase, private _sort: MatSort,
  	private _paginator: MatPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const displayDataChanges = [
      this._elementsDatabase.dataChange,
      this._sort.sortChange,
      this._paginator.page,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData().slice().filter((item:Element) => {
        let searchStr = JSON.stringify(item).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
      this.total = data.length;
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Element[] {
    const data = this._elementsDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: any = '';
      let propertyB: any = '';

      switch (this._sort.active) {
        case 'witness_name': [propertyA, propertyB] = [a.witness.witness_name, b.witness.witness_name]; break;
        case 'category': [propertyA, propertyB] = [a.category, b.category]; break;
        case 'side': [propertyA, propertyB] = [a.side, b.side]; break;
        case 'z_score': [propertyA, propertyB] = [a.score.average_z, b.score.average_z]; break;
        case 'raw_score': [propertyA, propertyB] = [a.score.raw_score, b.score.raw_score]; break;
        case 'date': [propertyA, propertyB] = [moment.utc(a['element_date']), moment.utc(b['element_date'])]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
