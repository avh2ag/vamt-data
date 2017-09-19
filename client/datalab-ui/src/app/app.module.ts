import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompetitorModule, CompetitorListComponent } from './competitors/index';

const appRoutes: Routes = [
  { path: 'competitors', component: CompetitorListComponent }
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
    CompetitorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
