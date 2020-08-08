import { Scene, GameInformation, CanvasScreen } from "../../engine/foundation";
import { Title } from "../gameObjects/title";
import { MainStageScene } from "./mainStageScene";
import { Input } from "../../engine/UI";

export class TitleScene extends Scene {
  constructor(canvas: CanvasScreen) {
    super("タイトル", canvas);
    const title = new Title(100, 200);
    this.addAll([title]);
  }

  update(gameInfo: GameInformation, input: Input) {
    super.update(gameInfo, input);

    if(input.getKeyDown(" ")) {
      const mainScene = new MainStageScene(this.canvas);
      this.changeScene(mainScene);
    }
  }
}