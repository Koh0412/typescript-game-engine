import { GameEvent } from "./gameEvent";

interface IEventListeners {
  [type: string]: ((e: GameEvent) => any)[];
}

type GameEventType = "spawnactor" | "destroy" | "changeScene" | "hit";

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
  addEventListener(type: GameEventType, callback: (e: GameEvent) => void): void;
  addEventListener(type: string, callback: (e: GameEvent) => void): void;
  // ----------------------------------------------------------------------------

  addEventListener(type: GameEventType, callback: (e: GameEvent) => void): void {
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
  dispatch(type: GameEventType,  event: GameEvent): void;
  dispatch(type: string,  event: GameEvent): void;
  // ---------------------------------------------------

  dispatch(type: GameEventType, event: GameEvent): void {
    const listeners = this.eventListeners[type];
    if (listeners !== undefined) {
      listeners.forEach((callback) => callback(event));
    }
  }
}