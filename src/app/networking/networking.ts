import {Session} from './session';

export interface Created {
  sessionId: string;
  authToken: string;
}

export interface Joined {
  authToken: string;
}

export interface Connected {
  userId: string;
  session: Session;
}

export type Event = EventGameEnded | EventOther;

export interface EventGameEnded {
  causedBy: string;
  type: 'gameEnded';
  winners: [string, string];
  session: Session;
}

export interface EventOther {
  causedBy: string;
  type: EventTypeOther;
  session: Session;
}

export type EventTypeOther = 'gameStarted'
  | 'joined'
  | 'participantsChanged'
  | 'periodic'
  | 'pieceDeployed'
  | 'pieceMoved'
  | 'piecePromoted';
