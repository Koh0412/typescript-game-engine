import { GameEvent, GameObjectEvent, SceneEvent } from "../../event";
import { ClickEvent } from "../../event/clickEvent";

export interface IEventListeners {
  [type: string]: ((e: GameEvent) => any)[];
}

export interface ActorEventKeyMap {
  "spawnactor": GameObjectEvent;
  "destroy": GameObjectEvent;
  "hit": GameObjectEvent;
}

export interface SceneEventKeyMap {
  "changeScene": SceneEvent;
}

export interface CanvasEventKeyMap {
  "click": ClickEvent;
}
