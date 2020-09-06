import { Scene, CanvasScreen, GameInformation } from "../../engine/foundation";
import { TextBox, Input } from "../../engine/UI";
import { TitleScene } from "./titleScene";
import { AudioAssets } from "../../engine/foundation/assets/audio";

export class GameOverScene extends Scene {
  title: TextBox;
  bgm: AudioAssets;

  constructor(canvas: CanvasScreen) {
    super("ゲームオーバー", canvas);
    this.title = new TextBox("ゲームオーバー", "red");
    this.title.setFont({ size: 22, family: "serif" });

    this.addAll([this.title]);

    this.bgm = new AudioAssets("gameover");
    this.bgm.play();
  }

  update(info: GameInformation, input: Input) {
    super.update(info, input);
    this.title.centering();

    if(input.getKeyDown("Enter")) {
      this.bgm.stopAndInit();
      this.changeScene(TitleScene);
    }
  }
}