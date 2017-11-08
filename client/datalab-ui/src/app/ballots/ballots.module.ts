import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallotListComponent } from './ballot-list/ballot-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  bootstrap: [BallotListComponent],
  declarations: [BallotListComponent],
  exports: [BallotListComponent]
})
export class BallotsModule { }
