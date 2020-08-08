import { Input } from "./input";

export class InputReceiver {
  private keyMap: Map<string, boolean>;
  private prevKeyMap: Map<string, boolean>;

  constructor() {
    this.keyMap = new Map<string, boolean>();
    this.prevKeyMap = new Map<string, boolean>();

    addEventListener("keydown", (e) => this.keyMap.set(e.key, true));
    addEventListener("keyup", (e) => this.keyMap.set(e.key, false));
  }

  /**
   * inputクラスの取得
   */
  getInput(): Input {
    const keyMap = new Map(this.keyMap);
    const prevKeyMap = new Map(this.prevKeyMap);
    this.prevKeyMap = new Map(this.keyMap);
    return new Input(keyMap, prevKeyMap);
  }
}