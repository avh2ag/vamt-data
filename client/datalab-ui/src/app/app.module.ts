import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSidenavModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitorModule, CompetitorListComponent } from './competitors/index';
import { CasesModule, CasesListComponent } from './cases/index';
import { BallotsModule, BallotListComponent } from './ballots/index';
import { TournamentsModule, TournamentListComponent } from './tournaments/index';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

const appRoutes: Routes = [
  { path: 'competitors', component: CompetitorListComponent },
  { path: 'cases', component: CasesListComponent },
  { path: 'ballots', component: BallotListComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: '**', redirectTo: '/competitors', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule, MatToolbarModule, MatButtonModule,
    RouterModule.forRoot(appRoutes),
    CompetitorModule,
    CasesModule,
    BallotsModule,
    TournamentsModule
  ],
  providers: [  {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
