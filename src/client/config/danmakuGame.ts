import { Game } from "@engine/foundation";
import { TitleScene } from "../scenes/titleScene";

export class DanmakuGame extends Game {
  constructor() {
    super("メイン", 300, 400);
    this.changeScene(TitleScene);
  }
}
