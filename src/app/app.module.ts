import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { JoinFormComponent } from './join-form/join-form.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { SessionComponent } from './session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinFormComponent,
    CreateFormComponent,
    SessionComponent,
    ParticipantListComponent,
    GameComponent,
    ChessboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
