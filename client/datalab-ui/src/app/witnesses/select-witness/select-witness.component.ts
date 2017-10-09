import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Witness } from '../../config/models';

@Component({
  selector: 'select-witness',
  templateUrl: './select-witness.component.html',
  styleUrls: ['./select-witness.component.css']
})
export class SelectWitnessComponent implements OnInit {

  witnessControl = new FormControl();

  options = [
    {
        "id": 1,
        "witness_name": "OWENS",
        "witness_type": ""
    },
    {
        "id": 2,
        "witness_name": "FOGEL",
        "witness_type": ""
    },
    {
        "id": 3,
        "witness_name": "MARTIN",
        "witness_type": ""
    },
  ];
  filteredOptions: Observable<Witness[]>;
  constructor() { }
  ngOnInit() {
    this.filteredOptions = this.witnessControl.valueChanges
        .startWith(null)
        .map(witness => witness && typeof witness === 'object' ? witness.witness_name : witness)
        .map(name => name ? this.filter(name) : this.options.slice());
  }

  filter(name: string): Witness[] {
    return this.options.filter(option =>
      option.witness_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(witness: Witness): string {
    return witness ? witness.witness_name : "";
  }

}
