import { EventDispatcher, ClickEvent } from "../../event";
import { Point2D } from "../../common/interfaces/system";

export class CanvasScreen extends EventDispatcher {
  name: string;

  private layer: number | undefined;
  private canvasElement: HTMLCanvasElement;

  constructor(name: string, width: number, height: number) {
    super();
    this.name = name;
    this.canvasElement = document.createElement("canvas");
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    this.canvasElement.style.position = "absolute";

    this.element.addEventListener("click", (e) => {
      const rect = this.element.getBoundingClientRect();
      const point: Point2D = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      this.dispatch("click", new ClickEvent({ point: point }));
    });
  }

  get element(): HTMLCanvasElement {
    return this.canvasElement;
  }

  /**
   * canvasのwidthの取得
   */
  get width(): number {
    return this.canvasElement.width;
  }

  /**
   * canvasのheightの取得
   */
  get height(): number {
    return this.canvasElement.height;
  }

  /**
   * contextの2Dを取得
   */
  get context2D(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext("2d");
  }

  /**
   * レイヤーの設定
   * @param index
   */
  setLayer(index: number): void {
    this.layer = index;
    this.canvasElement.style.zIndex = this.layer.toLocaleString();
  }

  /**
   * styleのpositionの値を変更
   * @param value
   */
  changeStylesPosition(value: string) {
    this.canvasElement.style.position = value;
  }
}