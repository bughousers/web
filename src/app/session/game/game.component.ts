import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  localplayercolor: "white" | "black" = "white";
  localplayerboard: 1 | 2 = 2;
  playernames: Array<string> = [
    "whitestub1",
    "blackstub1",
    "whitestub2",
    "blackstub2",
  ];
  //orientation: local player color on below
  //local player board on left

  constructor() {}

  ngOnInit(): void {}

  //generate the inputs for the chessboards dynamically
  getBoard1(left: boolean): boolean {
    if (left) {
      if (this.localplayerboard === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.localplayerboard === 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  getBoardid(left: boolean): number {
    if (left) {
      if (this.localplayerboard === 1) {
        return 1;
      } else {
        return 2;
      }
    } else {
      if (this.localplayerboard === 1) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  getBoardWhiteName(left: boolean): string {
    if (left) {
      if (this.localplayerboard === 1) {
        return this.playernames[0];
      } else {
        return this.playernames[2];
      }
    } else {
      if (this.localplayerboard === 1) {
        return this.playernames[2];
      } else {
        return this.playernames[0];
      }
    }
  }

  getBoardBlackName(left: boolean): string {
    if (left) {
      if (this.localplayerboard === 1) {
        return this.playernames[1];
      } else {
        return this.playernames[3];
      }
    } else {
      if (this.localplayerboard === 1) {
        return this.playernames[3];
      } else {
        return this.playernames[1];
      }
    }
  }

  getOrient(left: boolean): string {
    if (left) {
      return this.localplayercolor;
    } else {
      return this.reversePlayerColor();
    }
  }

  reversePlayerColor(): string {
    if (this.localplayercolor === "white") {
      return "black";
    } else {
      return "white";
    }
  }
}
