export interface Session {
  id: string;
  userId: string;
  userName: string;
  authToken: string;
  data?: SessionData;
}

export interface SessionData {
  user_names: Map<string, string>;
  score: Map<string, number>;
  participants: Array<string>;
  game_id: string;
  game?: GameData;
}

export interface GameData {
  active_participants: string[][];
  board: string[];
}
