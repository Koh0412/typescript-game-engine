import { Context2D, CanvasScreen } from "../../engine/foundation";

export class Title extends Context2D {
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