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
    return this.getKeyFromMap(keyName, this.keyMap);
  }

  /**
   * keydownしているかどうかを取得
   * @param keyName
   */
  getKeyDown(keyName: string): boolean | undefined {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return (!prevDown && currentDown);
  }

  /**
   * keyupしているかどうかを取得
   * @param keyName
   */
  getKeyUp(keyName: string): boolean | undefined {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return (prevDown && !currentDown);
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