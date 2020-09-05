import { GameEvent } from "./gameEvent";
import { IEventListeners, EventKeyMap } from "../common/interfaces/event";

export interface EventDispatcher {
  /**
   * `type`のイベントリスナーに`callback`を追加
   * @param type
   * @param callback
   */
  addEventListener<K extends keyof EventKeyMap>(type: K, callback: (e: EventKeyMap[K]) => void): void;
  addEventListener(type: string, callback: (e: GameEvent) => void): void;

  /**
   * イベントの発信を行う
   * @param type
   * @param event
   */
  dispatch<K extends keyof EventKeyMap>(type: K,  event: EventKeyMap[K]): void;
  dispatch(type: string,  event: GameEvent): void;
}

export class EventDispatcher {
  private eventListeners: IEventListeners;

  constructor() {
    this.eventListeners = {};
  }

  addEventListener<K extends keyof EventKeyMap>(type: K, callback: (e: EventKeyMap[K]) => void): void {
    if (this.eventListeners[type] === undefined) {
      this.eventListeners[type] = [];
    }

    this.eventListeners[type].push(callback);
  }

  dispatch<K extends keyof EventKeyMap>(type: K,  event: EventKeyMap[K]): void {
    const listeners = this.eventListeners[type];
    if (listeners !== undefined) {
      listeners.forEach((callback) => callback(event));
    }
  }
}