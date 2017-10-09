import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WitnessService } from './witness.service';
import { CreateWitnessComponent } from './create-witness/create-witness.component';

@NgModule({
  imports: [
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
