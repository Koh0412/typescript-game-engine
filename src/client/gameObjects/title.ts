import { Figure, CanvasScreen } from "../../engine/foundation";

export class Title extends Figure {
  constructor(x: number, y: number) {
    super(x, y);
  }

  render(targetCanvas: CanvasScreen): void {
    const context = targetCanvas.context2D;
    if (context) {
      context.font = "25px serif";
      context.fillStyle = "skyblue";
      context.fillText("弾幕STG", this.x, this.y);
    }
  }
}