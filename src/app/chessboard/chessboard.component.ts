import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-chessboard",
  templateUrl: "./chessboard.component.html",
  styleUrls: ["./chessboard.component.css"],
})
export class ChessboardComponent implements AfterViewInit {
  @Input() board1?: boolean;
  @Input() white?: string;
  @Input() black?: string;
  @Input() boardid: string = "board0";
  board?: Chessboard;
  poolWhite: number[] = [1, 0, 0, 0, 0];
  poolBlack: number[] = [1, 0, 0, 0, 0];
  whiteturn: boolean = true;

  constructor() {
  }

  ngAfterViewInit(): void {

    this.board = Chessboard(this.boardid, {
      draggable: true,
      sparePieces: true,
      orientation: "white",
      dropOffBoard: "snapback",
      onDrop: this.revDrop.bind(this),
      onDragStart: this.onDragStart.bind(this),
      position: "start",
      pieceTheme: "../../assets/img/chesspieces/wikipedia/{piece}.png",
    });
  }

  onDragStart(source: any, piece: any, position: any, orientation: any): any {
    /*if (this.board?.game_over()) {
      return false;
    }*/
    if (this.board === undefined) {
      console.log("board undefined, wtf1?");
    }
    if (this.whiteturn) {
      console.log("White's turn");
    }

    if (
      /* (this.whiteturn && piece.search(/^w/) !== -1) ||
      (!this.whiteturn && piece.search(/^b/) !== -1) */
      false
    ) {
      return false;
    } else {
      if (!this.checkMoveFromPool(source, piece, false)) {
        return false;
      } else {
        return;
      }
    }
  }

  revDrop(
    this: ChessboardComponent,
    source: string,
    target: string,
    piece: string,
    newPos: ChessboardPosition,
    oldPos: ChessboardPosition,
    orientation: ChessboardOrientation
  ): any {
    if (!this.checkMoveFromPool(source, piece, true)) {
      return "snapback";
    } else {
      return;
    }

    //always let it move
    return;
  }

  //return true if not from pool
  checkMoveFromPool(source: string, piece: string, update: boolean): boolean {
    if (source === "spare") {
      //return this.checkMoveFromPool(piece);

      switch (piece) {
        case "wP": {
          if (this.poolWhite[0] > 0) {
            if (update) {
              this.poolWhite[0] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "wR": {
          if (this.poolWhite[1] > 0) {
            if (update) {
              this.poolWhite[1] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "wN": {
          if (this.poolWhite[2] > 0) {
            if (update) {
              this.poolWhite[2] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "wB": {
          if (this.poolWhite[3] > 0) {
            if (update) {
              this.poolWhite[3] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "wQ": {
          if (this.poolWhite[4] > 0) {
            if (update) {
              this.poolWhite[4] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "wK": {
          //TODO:remove wK from spare pool
          return false;
        }
        case "bP": {
          if (this.poolBlack[0] > 0) {
            if (update) {
              this.poolBlack[0] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "bR": {
          if (this.poolBlack[1] > 0) {
            if (update) {
              this.poolBlack[1] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "bN": {
          if (this.poolBlack[2] > 0) {
            if (update) {
              this.poolBlack[2] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "bB": {
          if (this.poolBlack[3] > 0) {
            if (update) {
              this.poolBlack[3] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "bQ": {
          if (this.poolBlack[4] > 0) {
            if (update) {
              this.poolBlack[4] -= 1;
            }
            return true;
          } else {
            return false;
          }
        }
        case "bK": {
          //TODO: same as white
          return false;
        }
      }
    } else {
      return true;
    }
    return false;
  }
}
