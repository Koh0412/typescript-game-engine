import { Scene } from "./scene";
import { Rectangle } from "../foundation";
import { GameInformation, IGameInfo } from "./gameInformation";
import { CanvasScreen } from "./display/canvasScreen";
import { InputReceiver } from "../UI";
import { DEFAULT_MAX_FPS } from "../common/constants/systemConstants";
import { SceneClass } from "../event";

export class Game {
  canvas: CanvasScreen;

  private isPause: boolean;
  private currentScene: Scene | undefined;
  private title: string;
  private width: number;
  private height: number;
  private maxFps: number;
  private currentFps: number;
  private inputReceiver: InputReceiver;
  private prevTimestamp: number;
  private globalBackgroundColor: string | undefined;

  constructor(title: string, width: number = 600, height: number = 400) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.maxFps = DEFAULT_MAX_FPS;
    this.currentFps = 0;
    this.canvas = new CanvasScreen(title, width, height);

    this.inputReceiver = new InputReceiver();
    this.prevTimestamp = 0;
    this.isPause = false;

    console.log(`${title}が初期化されました。`);
  }

  /**
   * fpsの上限の変更 デフォルトは60
   * @param max
   */
  changeMaxFps(max: number): void {
    this.maxFps = max;
  }

  /**
   * シーンの切り替え
   * @param newScene
   */
  changeScene(newSceneClass: SceneClass): void {
    this.currentScene = new newSceneClass(this.canvas);
    this.currentScene.addEventListener("changeScene", (e) => this.changeScene(e.target));
    console.log(`シーンが${this.currentScene.name}に切り替わりました`);
  }

  /**
   * ゲームの一時停止
   */
  pause(): void {
    this.isPause = true;
  }

  /**
   * ゲームの再開
   */
  restart(): void {
    this.isPause = false;
    this.start();
  }

  /**
   * 全体の背景色を設定(これを使用する場合は個別に背景色を設定出来ない)
   * @param color
   */
  setGlobalBackgroundColor(color: string): void {
    this.globalBackgroundColor = color;
  }

  /**
   * ゲームの開始
   */
  start(): void {
    requestAnimationFrame(this.loop.bind(this));
  }

  private get gameInfo(): IGameInfo {
    const screenRectangle = new Rectangle(0, 0, this.width, this.height);
    const gameInfo: IGameInfo = {
      title: this.title,
      screenRectangle,
      mapFps: this.maxFps,
      currentFps: this.currentFps,
      globalBackroundColor: this.globalBackgroundColor,
    };
    return gameInfo;
  }

  /**
   * ループ処理
   * @param timestamp
   */
  private loop(timestamp: number): void {
    if (this.isPause) {
      return;
    }
    const elapsedSec = (timestamp - this.prevTimestamp) / 1000;
    const accuracy = 0.9;
    const frameTime = 1 / this.maxFps * accuracy;
    if (elapsedSec <= frameTime) {
      requestAnimationFrame(this.loop.bind(this));
      return;
    }

    this.prevTimestamp = timestamp;
    this.currentFps = 1 / elapsedSec;

    const info = new GameInformation(this.gameInfo);
    const input = this.inputReceiver.getInput();
    this.currentScene?.update(info, input);

    requestAnimationFrame(this.loop.bind(this));
  }
}