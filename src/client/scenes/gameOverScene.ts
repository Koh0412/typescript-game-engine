import { Scene, CanvasScreen, GameInformation } from "../../engine/foundation";
import { TextBox, Input } from "../../engine/UI";
import { TitleScene } from "./titleScene";

export class GameOverScene extends Scene {
  title: TextBox;

  constructor(canvas: CanvasScreen) {
    super("ゲームオーバー", canvas);
    this.title = new TextBox("ゲームオーバー", "red");
    this.title.setFont({ size: 22, family: "serif" });

    this.addAll([this.title]);
  }

  update(info: GameInformation, input: Input) {
    super.update(info, input);
    this.title.centering();

    if(input.getKeyDown("Enter")) {
      this.changeScene(TitleScene);
    }
  }
}