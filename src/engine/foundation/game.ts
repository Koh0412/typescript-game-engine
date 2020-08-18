import { Scene } from "./scene";
import { Rectangle } from "../foundation";
import { GameInformation } from "./gameInformation";
import { CanvasScreen } from "./display/canvasScreen";
import { InputReceiver } from "../UI";
import { DEFAULT_MAX_FPS } from "../common/constants/systemConstants";

export class Game {
  canvas: CanvasScreen;

  private isPause: boolean;
  private currentScene: Scene | null = null;
  private title: string;
  private width: number;
  private height: number;
  private maxFps: number;
  private currentFps: number;
  private inputReceiver: InputReceiver;
  private prevTimestamp: number;

  constructor(title: string, width: number, height: number) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.maxFps = DEFAULT_MAX_FPS;
    this.currentFps = 0;
    this.canvas = new CanvasScreen(width, height);

    this.inputReceiver = new InputReceiver();
    this.prevTimestamp = 0;
    this.isPause = false;

    console.log(`${title}が初期化されました。`);
  }

  /**
   * シーンの切り替え
   * @param newScene
   */
  changeScene(newScene: Scene): void {
    this.currentScene = newScene;
    this.currentScene.addEventListener("changeScene", (e) => this.changeScene(e.target));
    console.log(`シーンが${newScene.name}に切り替わりました`);
  }

  /**
   * ゲームの開始
   */
  start(): void {
    requestAnimationFrame(this.loop.bind(this));
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
  restart() {
    this.isPause = false;
    this.start();
  }

  /**
   * ゲームを描くためのcanvasを追加
   * @param canvas
   */
  addCanvas(canvas: CanvasScreen): void {
    const app = document.createElement("div");
    app.style.display = "inline-flex";
    app.style.position = "relative";
    app.appendChild(canvas.element as Node);

    document.body.appendChild(app);
  }

  /**
   * fpsの上限の変更 デフォルトは60
   * @param max
   */
  changeMaxFps(max: number) {
    this.maxFps = max;
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

    const screenRectangle = new Rectangle(0, 0, this.width, this.height);
    const info = new GameInformation(this.title, screenRectangle, this.maxFps, this.currentFps);
    const input = this.inputReceiver.getInput();
    if (this.currentScene) {
      this.currentScene.update(info, input);
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}