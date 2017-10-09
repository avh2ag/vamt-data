import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatProgressBarModule, MatFormFieldModule,
 MatIconModule, MatChipsModule, MatCheckboxModule,
 MatInputModule, MatButtonModule, MatTabsModule,
 MatTooltipModule, MatDialogModule, MatSelectModule } from '@angular/material';
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
    FlexLayoutModule, FormsModule, ReactiveFormsModule, 
    MatCardModule, MatProgressBarModule, MatFormFieldModule,
    MatIconModule, MatChipsModule, MatCheckboxModule,
    MatInputModule, MatButtonModule, MatTabsModule,
    MatTooltipModule, MatDialogModule, MatSelectModule,
  ],
  providers: [
    CasesService
  ],
  bootstrap: [CasesListComponent],
  exports: [CasesListComponent],
  entryComponents: [CreateCaseComponent]
})
export class CasesModule { }
