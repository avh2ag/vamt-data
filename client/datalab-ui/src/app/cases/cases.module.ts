import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatProgressBarModule, MatFormFieldModule,
 MatIconModule, MatChipsModule, MatCheckboxModule,
 MatInputModule, MatButtonModule, MatTabsModule,
 MatTooltipModule, MatDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CasesListComponent } from './cases-list/cases-list.component';
import { CasesService } from './cases.service';
import { CreateCaseComponent } from './create-case/create-case.component';

@NgModule({
  declarations: [
    CasesListComponent,
    CreateCaseComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,
    MatCardModule, MatProgressBarModule, MatFormFieldModule,
    MatIconModule, MatChipsModule, MatCheckboxModule,
    MatInputModule, MatButtonModule, MatTabsModule,
    MatTooltipModule, MatDialogModule
  ],
  providers: [
    CasesService
  ],
  bootstrap: [CasesListComponent],
  exports: [CasesListComponent],
  entryComponents: [CreateCaseComponent]
})
export class CasesModule { }
