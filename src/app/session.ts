export interface Session {
  users: Record<string, User>;
  participants: string[];
  game: GameState;
}

export interface User {
  name: string;
  score: number;
}

export type GameState = GameStateStarting | GameStateStarted | GameStateEnded;

export interface GameStateStarting {
  state: 'starting';
}

export interface GameStateStarted {
  state: 'started';
  data: {
    id: number;
    game: Game;
  };
}

export interface GameStateEnded {
  state: 'ended';
  data: {
    id: number;
  };
}

export interface Game {
  activeParticipants: [[string, string], [string, string]];
  remainingTime: [[Duration, Duration], [Duration, Duration]];
  board: [string, string];
  pool: number[][];
}

export interface Duration {
  secs: number;
  nanos: number;
}
