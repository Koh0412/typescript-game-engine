type VoidFunc = () => void;

interface IArrowKey {
  up: VoidFunc;
  down: VoidFunc;
  right: VoidFunc;
  left: VoidFunc;
}

export class Input {
  private keyMap: Map<string, boolean>;
  private prevKeyMap: Map<string, boolean>;

  constructor(keyMap: Map<string, boolean>, prevKeyMap: Map<string, boolean>) {
    this.keyMap = keyMap;
    this.prevKeyMap = prevKeyMap;
  }

  /**
   * キーを取得
   * @param keyName
   */
  getKey(keyName: string): boolean | undefined {
    if (keyName === "Space") {
      keyName = " ";
    }
    return this.getKeyFromMap(keyName, this.keyMap);
  }

  /**
   * keydown時の処理
   * @param keyName
   * @param callback
   */
  keyDown(keyName: string, callback: VoidFunc): void {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    const keydown = !prevDown && currentDown;

    if (keydown) {
      callback();
    }
  }

  /**
   * keyup時の処理
   * @param keyName
   * @param callback
   */
  keyUp(keyName: string, callback: VoidFunc): void {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    const keydown = (prevDown && !currentDown);

    if (keydown) {
      callback();
    }
  }

  /**
   * keypress時の処理
   * @param keyName
   * @param callback
   */
  keyPress(keyName: string, callback: VoidFunc) {
    if (this.getKey(keyName)) callback();
  }

  /**
   * 方向キーのバインドを行う
   * @param key
   */
  arrowkeyBind(key: IArrowKey) {
    this.keyPress("ArrowUp", () => key.up());
    this.keyPress("ArrowDown", () => key.down());
    this.keyPress("ArrowRight", () => key.right());
    this.keyPress("ArrowLeft", () => key.left());
  }

  /**
   * mapからキーを取得
   * @param keyName
   * @param map
   */
  private getKeyFromMap(keyName: string, map: Map<string, boolean>): boolean | undefined {
    if (map.has(keyName)) {
      return map.get(keyName);
    } else {
      return false;
    }
  }

  /**
   * 前のキーを取得
   * @param keyName
   */
  private getPrevKey(keyName: string): boolean | undefined {
    return this.getKeyFromMap(keyName, this.prevKeyMap);
  }
}