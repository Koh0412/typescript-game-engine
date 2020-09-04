import { GameEvent } from "./gameEvent";
import { Point2D } from "../common/interfaces/system";

interface IClickTarget {
  point: Point2D;
}

export class ClickEvent extends GameEvent {
  target: IClickTarget;

  constructor(target: IClickTarget) {
    super(target);
    this.target = {
      point: target.point,
    };
  }
}