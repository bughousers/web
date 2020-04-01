export class Session {

  constructor(
    public userNames: Map<number, string> = new Map(),
    public participants: number[] = [],
    public score: Map<number, number> = new Map(),
    public gameId: number = 0,
    public game?: Game
  ) { }

  static parse(data: any): Session {
    const userNames = new Map(
      Object.entries(data.userNames).map(([uid, n]) => [Number(uid), n as string])
    );
    const score = new Map(
      Object.entries(data.score).map(([uid, n]) => [Number(uid), n as number])
    );
    const game = data.game ? Game.parse(data.game) : undefined;
    return new Session(userNames, data.participants, score, data.gameId, game);
  }

}

export class Game {

  constructor(
    public activeParticipants: number[][],
    public board: string[],
    public pool: number[][],
  ) { }

  static parse(data: any): Game {
    return new Game(data.activeParticipants, data.board, data.pool);
  }

}
