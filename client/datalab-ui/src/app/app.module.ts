import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitorModule, CompetitorListComponent } from './competitors/index';
import { CasesModule, CasesListComponent } from './cases/index';

const appRoutes: Routes = [
  { path: 'competitors', component: CompetitorListComponent },
  { path: 'cases', component: CasesListComponent },
  { path: '**', redirectTo: '/competitors', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    CompetitorModule,
    CasesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
