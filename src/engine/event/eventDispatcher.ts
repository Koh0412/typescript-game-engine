import { GameEvent } from "./gameEvent";
import { IEventListeners } from "../common/interfaces/event";

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
  addEventListener(type: string, callback: (e: GameEvent) => void): void {
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
  dispatch(type: string,  event: GameEvent): void {
    const listeners = this.eventListeners[type];
    if (listeners !== undefined) {
      listeners.forEach((callback) => callback(event));
    }
  }
}