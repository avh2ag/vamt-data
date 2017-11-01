import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent]
})
export class UtilsModule { }
