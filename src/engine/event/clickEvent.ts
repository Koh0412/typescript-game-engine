import { GameEvent } from "./gameEvent";
import { Point2D } from "../common/interfaces/system";
import { CanvasScreen } from "../foundation";

interface IClickTarget {
  canvas: CanvasScreen;
  point: Point2D;
}

export class ClickEvent extends GameEvent {
  target: CanvasScreen;
  point: Point2D;

  constructor(target: IClickTarget) {
    super(target);
    this.target = target.canvas;
    this.point = target.point;
  }
}