import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Witness } from '../../config/models';
import { WitnessService } from '../witness.service';
@Component({
  selector: 'select-witness',
  templateUrl: './select-witness.component.html',
  styleUrls: ['./select-witness.component.css']
})
export class SelectWitnessComponent implements OnInit {
  @Input() outputList: Array<Witness>;	
  witnessSubscription;
  witnessControl = new FormControl();
  options: Array<Witness> = [];
  filteredOptions: Observable<Witness[]>;

  constructor(private witnessService: WitnessService) { }
  ngOnInit() {
  	console.log(this.outputList);
  	this.options = this.witnessService.loadedWitnesses;
  	this.witnessSubscription = this.witnessService.notifyDataChanged.subscribe((witnesses: Array<Witness>) => {
  		this.options = witnesses;
  	});
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

  addWitness() {
  	console.log(this.witnessControl.value);
  }

}
