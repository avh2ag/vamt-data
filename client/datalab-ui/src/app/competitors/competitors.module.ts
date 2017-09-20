import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CompetitorsService } from './competitors.service';
import { CompetitorDetailComponent } from './competitor-detail/competitor-detail.component';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';

@NgModule({
  declarations: [
    CompetitorListComponent,
    CompetitorDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
  	CompetitorsService
  ],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent]
})
export class CompetitorModule { }
