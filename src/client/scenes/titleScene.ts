import { Scene, GameInformation, CanvasScreen } from "../../engine/foundation";
import { MainStageScene } from "./mainStageScene";
import { Input, TextBox } from "../../engine/UI";
import { TileScene } from "./TileScene";

export class TitleScene extends Scene {
  private title: TextBox;

  constructor(canvas: CanvasScreen) {
    super("タイトル", canvas);
    this.title = new TextBox("弾幕STG", "limegreen");
    this.title.setFont({ size: 22, family: "serif" });

    this.addAll([this.title]);
  }

  update(gameInfo: GameInformation, input: Input) {
    super.update(gameInfo, input);
    this.title.centering();

    if(input.getKeyDown("Space")) {
      this.changeScene(MainStageScene);
    }

    if(input.getKeyDown("a")) {
      this.changeScene(TileScene);
    }
  }
}