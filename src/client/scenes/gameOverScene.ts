import { Scene, CanvasScreen, GameInformation, AudioAssets } from "../../engine/foundation";
import { TextBox, Input } from "../../engine/UI";
import { audioName } from "../common/constants/systemConst";
import { TitleScene } from "./titleScene";

export class GameOverScene extends Scene {
  title: TextBox;
  bgm: AudioAssets;

  constructor(canvas: CanvasScreen) {
    super("ゲームオーバー", canvas);
    this.title = new TextBox("ゲームオーバー", "red");
    this.title.setFont({ size: 22, family: "serif" });

    this.addAll([this.title]);

    this.bgm = new AudioAssets(audioName.GAMEOVER);
    this.bgm.play();
  }

  update(info: GameInformation, input: Input) {
    super.update(info, input);
    this.title.centering();

    input.keyDown("Enter", () => this.keyDownEnter());
  }

  /**
   * Enter押下時の処理
   */
  keyDownEnter() {
    this.bgm.stopAndInit();
    this.changeScene(TitleScene);
  }
}