import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';
import { MaterialModule } from '@angular/material';
import { CompetitorsService } from './competitors.service';

@NgModule({
  declarations: [
    CompetitorListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
  	CompetitorsService
  ],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent]
})
export class CompetitorModule { }
