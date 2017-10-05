import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CasesListComponent } from './cases-list/cases-list.component';
import { CasesService } from './cases.service';

@NgModule({
  declarations: [
    CasesListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexLayoutModule,

  ],
  providers: [
    CasesService
  ],
  bootstrap: [CasesListComponent],
  exports: [CasesListComponent]
})
export class CasesModule { }
