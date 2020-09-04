import { Scene, GameInformation, CanvasScreen } from "../../engine/foundation";
import { MainStageScene } from "./mainStageScene";
import { Input, TextBox } from "../../engine/UI";

export class TitleScene extends Scene {
  private title: TextBox;

  constructor(canvas: CanvasScreen) {
    super("タイトル", canvas);
    this.title = new TextBox("弾幕STG", "limegreen", "22px serif");
    this.addAll([this.title]);
  }

  update(gameInfo: GameInformation, input: Input) {
    super.update(gameInfo, input);
    this.title.centering();

    if(input.getKeyDown("Space")) {
      const mainScene = new MainStageScene(this.canvas);
      this.changeScene(mainScene);
    }
  }
}