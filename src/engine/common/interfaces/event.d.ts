import { GameEvent, GameObjectEvent, SceneEvent } from "../../event";
import { ClickEvent } from "../../event/clickEvent";

export interface IEventListeners {
  [type: string]: ((e: GameEvent) => any)[];
}

export interface EventKeyMap {
  "spawnactor": GameObjectEvent;
  "destroy": GameObjectEvent;
  "hit": GameObjectEvent;
  "changeScene": SceneEvent;
  "click": ClickEvent;
}
