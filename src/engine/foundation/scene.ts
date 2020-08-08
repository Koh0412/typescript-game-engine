import { EventDispatcher } from "../event/eventDispatcher";
import { Actor } from "./actor";
import { GameEvent } from "../event/gameEvent";
import { GameInformation } from "./gameInformation";
import { Input } from "../event/input";
import { CanvasScreen } from "./display/canvasScreen";


export class Scene extends EventDispatcher {
  name: string;
  actors: Actor[];

  protected canvas: CanvasScreen;
  private backgroundColor: string;
  private destroyedActors: Actor[];

  constructor(name: string, canvas: CanvasScreen) {
    super();

    this.name = name;
    this.backgroundColor = "black";
    this.actors = [];
    this.canvas = canvas;
    this.destroyedActors = [];
  }

  /**
   * `actor`を配列に追加し、イベントの実行を行う
   * @param actor
   */
  add(actor: Actor): void {
    this.actors.push(actor);
    actor.addEventListener("spawnactor", (e) => this.add(e.target));
    actor.addEventListener("destroy", (e) => this.addDestroyActor(e.target));
  }

  /**
   * `actors`をすべて配列に追加
   * @param actors
   */
  addAll(actors: Actor[]): void {
    actors.forEach((actor) => this.add(actor));
  }

  /**
   * シーンの切り替え
   * @param newScene
   */
  changeScene(newScene: Scene): void {
    const event = new GameEvent(newScene);
    this.dispatch("changeScene", event);
  }

  /**
   * 更新処理
   * @param gameInfo
   * @param input
   */
  update(gameInfo: GameInformation, input: Input): void {
    this.updateAll(gameInfo, input);
    this.hitTest();
    this.disposeDestroyActors();
    this.clearScreen(gameInfo);
    this.renderAll();
  }

  /**
   * シーンに指定の背景色をセットする
   * @param color
   */
  setBackgroundColor(color: string): void {
    this.backgroundColor = color;
  }

  /**
   * actorを配列から削除
   * @param actor
   */
  private remove(actor: Actor): void {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  /**
   * 全てのactorの更新処理を行う
   * @param gameInfo
   * @param input
   */
  private updateAll(gameInfo: GameInformation, input: Input): void {
    this.actors.forEach((actor) => actor.update(gameInfo, input));
  }

  /**
   * 当たり判定の実行
   */
  private hitTest(): void {
    const length = this.actors.length;
    for(let i = 0; i < length - 1; i++) {
      for(let j = i + 1; j < length; j++) {
        const obj1 = this.actors[i];
        const obj2 = this.actors[j];
        const hit = obj1.hitArea.hitTest(obj2.hitArea);
        if(hit) {
          obj1.dispatch("hit", new GameEvent(obj2));
          obj2.dispatch("hit", new GameEvent(obj1));
        }
      }
    }
  }

  /**
   * スクリーンのクリアリング
   * @param gameInfo
   */
  private clearScreen(gameInfo: GameInformation): void {
    const context = this.canvas.context2D;
    const width = gameInfo.screenRectangle.width;
    const height = gameInfo.screenRectangle.height;

    if (context) {
      context.fillStyle = this.backgroundColor;
      context.fillRect(0, 0, width, height);
    }
  }

  /**
   * 全ての描画処理を行う
   */
  private renderAll(): void {
    this.actors.forEach((obj) => obj.render(this.canvas));
  }

  /**
   * destroyedActorsに入っているactorをactorの配列から削除し, destroyedActorsの中身も空にする
   */
  private disposeDestroyActors(): void {
    this.destroyedActors.forEach((actor) => this.remove(actor));
    this.destroyedActors = [];
  }

  /**
   * canvas上から削除された`actor`を配列に格納
   * @param actor
   */
  private addDestroyActor(actor: Actor): void {
    this.destroyedActors.push(actor);
  }
}