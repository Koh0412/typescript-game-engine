import { EventDispatcher } from "../event/eventDispatcher";
import { Rectangle } from "./display/rectangle";
import { GameEvent } from "../event/gameEvent";
import { GameInformation } from "./gameInformation";
import { Input } from "../event/input";
import { CanvasScreen } from "./display/canvasScreen";

export class Actor extends EventDispatcher {
  hitArea: Rectangle;
  tags: string[];
  private hitAreaOffsetX: number;
  private hitAreaOffsetY: number;
  private _x: number = 0;
  private _y: number = 0;

  constructor(x: number, y: number, hitArea: Rectangle, tags: string[] = []) {
    super();
    this.hitArea = hitArea;
    this.hitAreaOffsetX = hitArea.x;
    this.hitAreaOffsetY = hitArea.y;
    this.tags = tags;

    this.x = x;
    this.y = y;
  }

  /** privateなxを取得 */
  get x(): number {
    return this._x;
  }

  /** privateなxに値をセット */
  set x(value: number) {
    this._x = value;
    this.hitArea.x = value + this.hitAreaOffsetX;
  }

  /** privateなyを取得 */
  get y(): number {
    return this._y;
  }

  /** privateなyに値をセット */
  set y(value: number) {
    this._y = value;
    this.hitArea.y = value + this.hitAreaOffsetY;
  }

  /**
   * 更新処理
   * @param gameInfo
   * @param input
   */
  update(gameInfo: GameInformation, input: Input) {}

  /**
   * 描画処理
   * @param target
   */
  render(targetCanvas: CanvasScreen) {}

  /**
   * `tagName`のタグがあるかどうか
   * @param tagName
   */
  hasTag(tagName: string): boolean {
    return this.tags.includes(tagName);
  }

  /**
   * spawnactorイベントの実行
   * @param actor
   */
  spawnActor(actor: Actor): void {
    this.dispatch("spawnactor", new GameEvent(actor))
  }

  /**
   * destroyイベントの実行
   */
  destroy(): void {
    this.dispatch("destroy", new GameEvent(this));
  }
}