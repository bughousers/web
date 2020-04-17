import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ChessboardComponent} from './chessboard/chessboard.component';
import {GameComponent} from './game/game.component';
import {ParticipantListComponent} from './participant-list/participant-list.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {SessionRoutingModule} from './session-routing.module';
import {SessionComponent} from './session.component';

@NgModule({
  declarations: [
    SessionComponent,
    ParticipantListComponent,
    ScoreboardComponent,
    GameComponent,
    ChessboardComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule
  ]
})
export class SessionModule {
}
