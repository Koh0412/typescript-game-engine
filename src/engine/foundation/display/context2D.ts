import { Actor } from "../actor";
import { Rectangle } from "./rectangle";
import { CanvasScreen } from "./canvasScreen";

export abstract class Context2D extends Actor {
  protected width: number;
  protected height: number;

  constructor(x: number, y: number) {
    const hitarea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitarea);

    this.width = 0;
    this.height = 0;
  }

  abstract render(targetCanvas: CanvasScreen): void;
}