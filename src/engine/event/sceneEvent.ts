import { GameEvent } from "./gameEvent";
import { Scene, CanvasScreen } from "../foundation";

export interface SceneClass {
  new (canvas: CanvasScreen): Scene;
}

export class SceneEvent extends GameEvent {
  target: SceneClass;

  constructor(target: SceneClass) {
    super(target);
    this.target = target;
  }
}