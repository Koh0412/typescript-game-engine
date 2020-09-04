import { Game } from "../../engine/foundation";
import { TitleScene } from "../scenes/titleScene";

export class DanmakuGame extends Game {
  constructor() {
    super("メイン", 300, 400);
    const titleScene = new TitleScene(this.canvas);
    this.changeScene(titleScene);
  }
}