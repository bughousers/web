import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chessboard",
  templateUrl: "./chessboard.component.html",
  styleUrls: ["./chessboard.component.css"]
})
export class ChessboardComponent implements OnInit {
  @Input() board1?: boolean;

  board?: Chessboard;
  constructor() {}

  ngOnInit(): void {
    this.board = Chessboard("board1", {
      draggable: true,
      dropOffBoard: "trash",
      sparePieces: true,
      orientation: "white",
      onDrop: this.revDrop.bind(this),
      position: "start",
      pieceTheme: "../../assets/img/chesspieces/wikipedia/{piece}.png"
    });
  }


  revDrop(
    source: string,
    target: string,
    piece: string,
    newPos: ChessboardPosition,
    oldPos: ChessboardPosition,
    orientation: ChessboardOrientation
  ): any {
    //change this with response
    if (true) {
      let st = ''.concat(target, '-', source);
      console.log(st);
      let x = this.board?.move(st);
      console.log(x);
      console.log("uwu");
      return;
      //return "snapback";
    } else {
      return;
    }
  }
}

function preventDrop(event: DragEvent): void {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    // The event can be canceled, so we do so.
    event.preventDefault();
  } else {
    // The event cannot be canceled, so it is not safe
    // to call preventDefault() on it.
    console.warn(`The following event couldn't be canceled:`);
    console.dir(event);
  }
}

function listenOnDragMove(): void {}

function listenOnChange(): void {}
