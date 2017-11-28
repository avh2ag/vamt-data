import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatProgressBarModule, MatFormFieldModule,
 MatIconModule, MatChipsModule, MatCheckboxModule,
 MatInputModule, MatButtonModule, MatTabsModule,
 MatTooltipModule, MatDialogModule, MatSelectModule,
 MatListModule, MatExpansionModule, MatDatepickerModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentPreviewComponent } from './tournament-preview/tournament-preview.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { CasesModule } from '../cases/cases.module';
import { TeamsModule } from '../teams/teams.module';
@NgModule({
  imports: [
    CommonModule, MatCardModule, MatProgressBarModule, MatFormFieldModule,
 	MatIconModule, MatChipsModule, MatCheckboxModule,
 	MatInputModule, MatButtonModule, MatTabsModule,
 	MatTooltipModule, MatDialogModule, MatSelectModule,
 	MatListModule, MatExpansionModule, MatDatepickerModule,
 	FlexLayoutModule, FormsModule, ReactiveFormsModule,
 	CasesModule, TeamsModule
  ],
  declarations: [TournamentListComponent, TournamentPreviewComponent,
   TournamentDetailComponent, CreateTournamentComponent],
  exports: [TournamentPreviewComponent, TournamentDetailComponent],
  entryComponents: [CreateTournamentComponent, TournamentPreviewComponent, TournamentDetailComponent]
})
export class TournamentsModule { }
