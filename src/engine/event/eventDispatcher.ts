import { GameEvent } from "./gameEvent";
import { GameObjectEvent } from "./gameObjectEvent";
import { SceneEvent } from "./sceneEvent";
import { IEventListeners } from "../common/interfaces/event";
import { GameObjectEventType, SceneEventType } from "../common/types/event.type";

export class EventDispatcher {
  private eventListeners: IEventListeners;

  constructor() {
    this.eventListeners = {};
  }

  /**
   * `type`のイベントリスナーに`callback`を追加
   * @param type
   * @param callback
   */
  // ---------------------------internal interface-------------------------------
  addEventListener(type: GameObjectEventType, callback: (e: GameObjectEvent) => void): void;
  addEventListener(type: SceneEventType, callback: (e: SceneEvent) => void): void;
  addEventListener(type: string, callback: (e: GameEvent) => void): void;
  // ----------------------------------------------------------------------------

  addEventListener(type: GameObjectEventType | SceneEventType, callback: (e: GameEvent) => void): void {
    if (this.eventListeners[type] === undefined) {
      this.eventListeners[type] = [];
    }

    this.eventListeners[type].push(callback);
  }

  /**
   * イベントの発信を行う
   * @param type
   * @param event
   */
  // ---------------internal interface------------------
  dispatch(type: GameObjectEventType,  event: GameObjectEvent): void;
  dispatch(type: SceneEventType,  event: SceneEvent): void;
  dispatch(type: string,  event: GameEvent): void;
  // ---------------------------------------------------

  dispatch(type: GameObjectEventType | SceneEventType, event: GameEvent): void {
    const listeners = this.eventListeners[type];
    if (listeners !== undefined) {
      listeners.forEach((callback) => callback(event));
    }
  }
}