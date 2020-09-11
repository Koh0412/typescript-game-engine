import { Scene } from "./scene";
import { Rectangle } from "../foundation";
import { GameInformation, IGameInfo } from "./gameInformation";
import { CanvasScreen } from "./display/canvasScreen";
import { InputReceiver } from "../UI";
import { DEFAULT_MAX_FPS } from "../common/constants/systemConstants";
import { SceneClass } from "../event";

interface IGameOtions {
  initlog?: boolean;
}

interface IGameSize {
  width: number;
  height: number;
}

export class Game {
  canvas: CanvasScreen;
  showSceneLog: boolean;

  private width: number;
  private height: number;
  private originalSize: IGameSize;

  private maxFps: number;
  private currentFps: number;
  private prevTimestamp: number;

  private isPause: boolean;
  private title: string;

  private currentScene: Scene | undefined;
  private inputReceiver: InputReceiver;
  private globalBackgroundColor: string | undefined;
  private resizeListener: { func: () => void } | undefined;

  constructor(title: string, width: number = 600, height: number = 400, options?: IGameOtions) {
    this.title = title;
    this.width = width;
    this.originalSize = { width, height };
    this.height = height;
    this.maxFps = DEFAULT_MAX_FPS;
    this.currentFps = 0;
    this.canvas = new CanvasScreen(title, width, height);
    this.showSceneLog = true;

    this.inputReceiver = new InputReceiver();
    this.prevTimestamp = 0;
    this.isPause = false;
    if (!options) {
      options = this.defaultGameOptions;
    }

    if (options.initlog) {
      console.log(`${title}が初期化されました。`);
    }
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
    if (this.showSceneLog) {
      console.log(`シーンが${this.currentScene.name}に切り替わりました`);
    }
  }

  /**
   * フルスクリーン表示
   */
  fullScreen() {
    const func = () => this.canvasResize(innerWidth, innerHeight, "0");
    this.resizeListener = { func };
    func();
    addEventListener("resize", func, false);
  }

  /**
   * 元のサイズに戻す
   */
  backOriginalSizeScreen() {
    this.canvasResize(this.originalSize.width, this.originalSize.height, "0.5rem");
    if (this.resizeListener) {
      removeEventListener("resize", this.resizeListener.func, false);
    }
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

  /** updateに渡すゲームの情報 */
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
   * キャンバスのリサイズを行う
   * @param width
   * @param height
   * @param marginStyle
   */
  private canvasResize(width: number, height: number, marginStyle: string): void {
    this.width = width;
    this.height = height;
    this.canvas.setSize(width, height);
    document.body.style.margin = marginStyle;
  }

  /**
   * デフォルトのゲームオプション
   */
  private get defaultGameOptions(): IGameOtions {
    const options: IGameOtions = {
      initlog: true
    };
    return options;
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