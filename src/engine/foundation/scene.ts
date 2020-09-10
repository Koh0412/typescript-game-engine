import { EventDispatcher } from "../event/eventDispatcher";
import { Actor } from "./actor";
import { GameInformation } from "./gameInformation";
import { Input } from "../UI/input";
import { CanvasScreen } from "./display/canvasScreen";
import { GameObjectEvent, SceneEvent, SceneClass, GameEvent } from "../event";
import { SceneEventKeyMap } from "../common/interfaces/event";
import { TileMap } from "../sprite/tileMap";
import { Camera } from "./camera";
import { assets } from "./assets/assetLoader";

export interface Scene {
  addEventListener<K extends keyof SceneEventKeyMap>(type: K, callback: (e: SceneEventKeyMap[K]) => void): void;
  addEventListener(type: string, callback: (e: GameEvent) => void): void;

  dispatch<K extends keyof SceneEventKeyMap>(type: K,  event: SceneEventKeyMap[K]): void;
  dispatch(type: string,  event: GameEvent): void;
}

export class Scene extends EventDispatcher {
  name: string;
  tileMap: TileMap | undefined;

  protected canvas: CanvasScreen;
  private actors: Actor[];
  private backgroundColor: string;
  private backgroundImage: HTMLImageElement | undefined;
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
   * キャンバスの背景画像を設定
   * @param assetName
   */
  setBackgroundImage(assetName: string) {
    this.backgroundImage = assets.getAsImage(assetName);
  }

  /**
   * タイルマップのカメラを生成
   */
  createTileMapCamera() {
    if (this.tileMap) {
      return new Camera(this.tileMap, this.canvas.width, this.canvas.height);
    }
  }

  /**
   * actorを配列から削除
   * @param actor
   */
  remove(actor: Actor): void {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  /**
   * シーンの切り替え
   * @param newScene
   */
  protected changeScene(newSceneClass: SceneClass): void {
    const event = new SceneEvent(newSceneClass);
    this.dispatch("changeScene", event);
  }

  /**
   * `actor`を配列に追加し、イベントの実行を行う
   * @param actor
   */
  protected add(actor: Actor): void {
    this.actors.push(actor);
    actor.sceneName = this.name;
    actor.addEventListener("spawnactor", (e) => this.add(e.target));
    actor.addEventListener("destroy", (e) => this.addDestroyActor(e.target));
  }

  /**
   * `actors`をすべて配列に追加
   * @param actors
   */
  protected addAll(actors: Actor[]): void {
    actors.forEach((actor) => this.add(actor));
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
        const hit = obj1.hitArea.hitTestRect(obj2.hitArea);
        if(hit) {
          obj1.dispatch("hit", new GameObjectEvent(obj2));
          obj2.dispatch("hit", new GameObjectEvent(obj1));
        }
      }
    }
  }

  /**
   * スクリーンのクリアリング
   * @param gameInfo
   */
  private clearScreen(gameInfo: GameInformation): void {
    if (gameInfo.globalBackgroundColor) {
      this.backgroundColor = gameInfo.globalBackgroundColor;
    }
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
    if (this.backgroundImage) {
      this.canvas.context2D?.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    this.tileMap?.drawTile(this.canvas.context2D);
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