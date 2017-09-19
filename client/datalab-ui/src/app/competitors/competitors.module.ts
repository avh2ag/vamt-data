import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    CompetitorListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent]
})
export class CompetitorModule { }
