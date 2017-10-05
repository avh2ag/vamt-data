import { Component, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Case } from '../../config/models';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {

  constructor(private casesService: CasesService) { }

  ngOnInit() {
  	this.casesService.getAllCases().subscribe( (resp: Array<Case>) => {
  		console.log(resp);
  	});
  }

}
