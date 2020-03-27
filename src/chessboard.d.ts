
interface ChessboardPositionObject {}

type ChessboardFenString = string;

type ChessboardPosition =
  | "start"
  | ChessboardFenString
  | ChessboardPositionObject;

type ChessboardCallback = (...args: any[]) => any;

type ChessboardOrientation = "white" | "black";

type ChessboardSpeed = number | "slow" | "fast";

interface ChessboardConfig {
  draggable?: boolean;
  dropOffBoard?: "snapback" | "trash";
  position?: ChessboardPosition;
  onChange?: ChessboardCallback;
  onDragStart?: ChessboardCallback;
  onDragMove?: ChessboardCallback;
  onDrop?: (
    source: string,
    target: string,
    piece: string,
    newPos: ChessboardPosition,
    oldPos: ChessboardPosition,
    orientation: ChessboardOrientation
  ) => void;
  onMouseoutSquare?: ChessboardCallback;
  onMouseoverSquare?: ChessboardCallback;
  onMoveEnd?: ChessboardCallback;
  onSnapbackEnd?: ChessboardCallback;
  onSnapEnd?: ChessboardCallback;
  orientation?: ChessboardOrientation;
  showNotation?: boolean;
  sparePieces?: boolean;
  showErrors?: false | string | ChessboardCallback;
  pieceTheme?: string | ChessboardCallback;
  appearSpeed?: ChessboardSpeed;
  moveSpeed?: ChessboardSpeed;
  snapbackSpeed?: ChessboardSpeed;
  snapSpeed?: ChessboardSpeed;
  trashSpeed?: ChessboardSpeed;
}

interface Chessboard {
  clear(useAnimation?: boolean): void;
  destroy(): void;
  fen(): ChessboardFenString;
  flip(): void;
  move(
    move1: string,
    ...args: string[]
  ): ChessboardPositionObject;

  position(fen: "fen"): ChessboardFenString;
  position(o:ChessboardFenString, useAnimation?:boolean):void;
  position(o:ChessboardPositionObject, useAnimation?:boolean):void;

  position(o:any, useAnimation?:boolean):void;

  orientation(): ChessboardOrientation;
  orientation(side: ChessboardOrientation | "flip"): void;
  resize(): void;
  start(useAnimation?: boolean): void;
}

interface ChessboardFactory {
  (containerElOrString: any, config: "start" | ChessboardConfig): Chessboard;
  fenToObj(fen: string): ChessboardPositionObject | false;
  objToFen(obj: ChessboardPositionObject): ChessboardFenString | false;
}

declare const Chessboard: ChessboardFactory;


