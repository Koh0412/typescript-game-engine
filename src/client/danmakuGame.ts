import { Game } from "../engine/foundation";
import { TitleScene } from "./scenes/titleScene";

export class DanmakuGame extends Game {
  constructor() {
    super("弾幕STG", 300, 400, 60);
    const titleScene = new TitleScene(this.canvas);
    this.changeScene(titleScene);
  }
}