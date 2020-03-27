import { BehaviorSubject } from 'rxjs';

export class Session {

  lobby?: BehaviorSubject<Lobby>;
  game?: BehaviorSubject<Game>;
  board?: BehaviorSubject<string[]>;

  is_owner(): boolean {
    return this.userId === '0';
  }

  constructor(
    public id: string,
    public userId: string,
    public userName: string,
    public authToken: string
  ) { }
}

export class Lobby {

  constructor(
    public userNames: Map<string, string>,
    public score: Map<string, number>,
    public participants: Array<string>,
    public gameId: string
  ) { }
}

export class Game {

  constructor(
    public activeParticipants: string[][]
  ) { }
}
