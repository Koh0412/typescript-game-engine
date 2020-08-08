import { GameEvent } from "./gameEvent";
import { Actor } from "../foundation";

export class GameObjectEvent extends GameEvent {
  target: Actor;

  constructor(target: Actor) {
    super(target);
    this.target = target;
  }
}