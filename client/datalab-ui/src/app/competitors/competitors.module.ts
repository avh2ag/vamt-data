import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';

@NgModule({
  declarations: [
    CompetitorListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent]
})
export class CompetitorModule { }
