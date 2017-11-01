import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent]
})
export class UtilsModule { }
