import { GameEvent } from "./gameEvent";
import { Scene } from "../foundation";

export class SceneEvent extends GameEvent {
  target: Scene;

  constructor(target: Scene) {
    super(target);
    this.target = target;
  }
}