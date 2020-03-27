export class Session {

  data?: SessionData;

  constructor(
    public id: string,
    public userId: number,
    public userName: string,
    public authToken: string
  ) { }
}

export class SessionData {

  game?: GameData;

  constructor(
    public userNames: Map<number, string>,
    public score: Map<number, number>,
    public participants: Array<number>,
    public gameId: number
  ) { }
}

export class GameData {

  constructor(
    public activeParticipants: number[][],
    board: string[]
  ) { }
}
