import { Component, OnInit } from '@angular/core';
import { WitnessService } from '../witness.service';
@Component({
  selector: 'create-witness',
  templateUrl: './create-witness.component.html',
  styleUrls: ['./create-witness.component.css']
})
export class CreateWitnessComponent implements OnInit {

  constructor(private witnessService: WitnessService) { }

  ngOnInit() {
  	this.witnessService.createWitness("test", "character").subscribe(resp => {
  		console.log(resp);
  	}, err => {
  		console.log(err);
  	});
  }

}
