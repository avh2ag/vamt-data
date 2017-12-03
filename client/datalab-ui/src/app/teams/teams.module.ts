import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule,
MatAutocompleteModule, MatSnackBarModule, MatIconModule,
MatButtonModule, MatTooltipModule, MatChipsModule } from '@angular/material';
import { SelectTeamsComponent } from './select-teams/select-teams.component';
import { TeamsService } from './teams.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CompetitorModule } from '../competitors/competitors.module';
@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
	MatFormFieldModule, MatInputModule, MatSelectModule,MatAutocompleteModule,
	MatSnackBarModule, MatIconModule, MatButtonModule, MatTooltipModule,
  MatChipsModule,
	CompetitorModule
  ],
  providers: [ TeamsService ],
  declarations: [SelectTeamsComponent, CreateTeamComponent],
  entryComponents: [SelectTeamsComponent],
  exports: [SelectTeamsComponent, CreateTeamComponent]
})
export class TeamsModule { }
