import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule,
MatAutocompleteModule, MatSnackBarModule, MatIconModule, MatButtonModule, } from '@angular/material';
import { SelectTeamsComponent } from './select-teams/select-teams.component';
import { TeamsService } from './teams.service';
@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
	MatFormFieldModule, MatInputModule, MatSelectModule,MatAutocompleteModule,
	MatSnackBarModule, MatIconModule, MatButtonModule,
  ],
  providers: [ TeamsService ],
  declarations: [SelectTeamsComponent],
  entryComponents: [SelectTeamsComponent],
  exports: [SelectTeamsComponent]
})
export class TeamsModule { }
