import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WitnessService } from './witness.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateWitnessComponent } from './create-witness/create-witness.component';
import { MatSnackBarModule, MatIconModule, MatButtonModule,
MatFormFieldModule, MatInputModule, MatSelectModule,
MatTooltipModule, MatAutocompleteModule, MatCardModule, MatProgressBarModule,
MatChipsModule, MatTableModule, MatPaginatorModule,  MatSortModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SelectWitnessComponent } from './select-witness/select-witness.component';
import { WitnessTableComponent } from './witness-table/witness-table.component';

@NgModule({
  imports: [
  	FlexLayoutModule,
  	MatSnackBarModule, MatIconModule, MatButtonModule,
  	MatFormFieldModule, MatInputModule, MatSelectModule,
  	FormsModule, ReactiveFormsModule, MatTooltipModule,
    MatCardModule, MatProgressBarModule, MatChipsModule,
    MatTableModule, MatPaginatorModule,  MatSortModule,     
    MatAutocompleteModule, CdkTableModule,
    CommonModule
  ],
  providers: [
    WitnessService
  ],
  declarations: [CreateWitnessComponent, SelectWitnessComponent, WitnessTableComponent],
  entryComponents: [CreateWitnessComponent, WitnessTableComponent],
  exports: [CreateWitnessComponent, SelectWitnessComponent, WitnessTableComponent]
})
export class WitnessesModule { }
