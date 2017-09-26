import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ElementsModule } from '../elements/elements.module';
import { CompetitorsService } from './competitors.service';
import { CompetitorDetailComponent } from './competitor-detail/competitor-detail.component';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';
import { CompetitorPreviewComponent } from './competitor-preview/competitor-preview.component';
import { CompetitorPipe } from './competitor-list/competitor-filter.pipe';

@NgModule({
  declarations: [
    CompetitorListComponent,
    CompetitorDetailComponent,
    CompetitorPreviewComponent,
    CompetitorPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    ElementsModule
  ],
  providers: [
  	CompetitorsService
  ],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent]
})
export class CompetitorModule { }
