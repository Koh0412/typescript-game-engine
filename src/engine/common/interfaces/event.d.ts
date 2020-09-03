import { GameEvent } from "../../event";

export interface IEventListeners {
  [type: string]: ((e: GameEvent) => any)[];
}