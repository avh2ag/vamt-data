import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatProgressBarModule, MatFormFieldModule,
 MatIconModule, MatChipsModule, MatTableModule, 
 MatPaginatorModule, MatInputModule, MatButtonModule, MatSortModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ElementTableComponent } from './element-table/element-table.component';

@NgModule({
   declarations: [
     ElementTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatCardModule, MatProgressBarModule, MatFormFieldModule,
    MatIconModule, MatChipsModule, MatTableModule, MatPaginatorModule,
    MatInputModule, MatButtonModule, MatSortModule,
    CdkTableModule,
    FlexLayoutModule
  ],
  providers: [
  	//ElementsService @todo
  ],
  bootstrap: [ElementTableComponent],
  exports: [ElementTableComponent]
})
export class ElementsModule { }
