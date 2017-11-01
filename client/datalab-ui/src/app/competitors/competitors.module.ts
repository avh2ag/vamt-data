import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatProgressBarModule, MatFormFieldModule,
 MatIconModule, MatChipsModule, MatCheckboxModule,
 MatInputModule, MatButtonModule, MatTabsModule,
 MatTooltipModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ElementsModule } from '../elements/elements.module';
import { CompetitorsService } from './competitors.service';
import { CompetitorDetailComponent } from './competitor-detail/competitor-detail.component';
import { CompetitorListComponent } from './competitor-list/competitor-list.component';
import { CompetitorPreviewComponent } from './competitor-preview/competitor-preview.component';
import { CompetitorPipe } from './competitor-list/competitor-filter.pipe';
import { CreateCompetitorComponent } from './create-competitor/create-competitor.component';

@NgModule({
  declarations: [
    CompetitorListComponent,
    CompetitorDetailComponent,
    CompetitorPreviewComponent,
    CompetitorPipe,
    CreateCompetitorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule, MatInputModule, 
    MatButtonModule, MatTooltipModule,
    MatTabsModule, MatDialogModule, MatSnackBarModule,
    FlexLayoutModule,
    ElementsModule
  ],
  providers: [
  	CompetitorsService
  ],
  bootstrap: [CompetitorListComponent],
  exports: [CompetitorListComponent],
  entryComponents: [CreateCompetitorComponent]
})
export class CompetitorModule { }
