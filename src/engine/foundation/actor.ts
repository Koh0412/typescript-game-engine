import { EventDispatcher } from "../event/eventDispatcher";
import { Rectangle } from "./display/rectangle";
import { GameObjectEvent, GameEvent } from "../event";
import { GameInformation } from "./gameInformation";
import { Input } from "../UI/input";
import { CanvasScreen } from "./display/canvasScreen";
import { ActorEventKeyMap } from "../common/interfaces/event";

export interface Actor {
  addEventListener<K extends keyof ActorEventKeyMap>(type: K, callback: (e: ActorEventKeyMap[K]) => void): void;
  addEventListener(type: string, callback: (e: GameEvent) => void): void;

  dispatch<K extends keyof ActorEventKeyMap>(type: K,  event: ActorEventKeyMap[K]): void;
  dispatch(type: string,  event: GameEvent): void;
}

export class Actor extends EventDispatcher {
  hitArea: Rectangle;
  sceneName: string = "";

  private tags: string[];
  private hitAreaOffsetX: number;
  private hitAreaOffsetY: number;

  #x: number = 0;
  #y: number = 0;

  constructor(x: number, y: number, hitArea: Rectangle, tags: string[] = []) {
    super();
    this.hitArea = hitArea;
    this.hitAreaOffsetX = hitArea.x;
    this.hitAreaOffsetY = hitArea.y;
    this.tags = tags;

    this.x = x;
    this.y = y;
  }

  /** hard privateなxを取得 */
  get x(): number {
    return this.#x;
  }

  /** hard privateなxに値をセット */
  set x(value: number) {
    this.#x = value;
    this.hitArea.x = value + this.hitAreaOffsetX;
  }

  /** hard privateなyを取得 */
  get y(): number {
    return this.#y;
  }

  /** hard privateなyに値をセット */
  set y(value: number) {
    this.#y = value;
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
    this.dispatch("spawnactor", new GameObjectEvent(actor))
  }

  /**
   * destroyイベントの実行
   */
  destroy(): void {
    this.dispatch("destroy", new GameObjectEvent(this));
  }
}