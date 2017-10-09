import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WitnessService } from './witness.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateWitnessComponent } from './create-witness/create-witness.component';
import { MatSnackBarModule, MatIconModule, MatButtonModule,
MatFormFieldModule, MatInputModule, MatSelectModule,
MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
  	FlexLayoutModule,
  	MatSnackBarModule, MatIconModule, MatButtonModule,
  	MatFormFieldModule, MatInputModule, MatSelectModule,
  	FormsModule, ReactiveFormsModule, MatTooltipModule,
    CommonModule
  ],
  providers: [
    WitnessService
  ],
  declarations: [CreateWitnessComponent],
  entryComponents: [CreateWitnessComponent],
  exports: [CreateWitnessComponent]
})
export class WitnessesModule { }
