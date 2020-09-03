export class CanvasScreen {
  private canvasElement: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.canvasElement = document.createElement("canvas");
    this.canvasElement.width = width;
    this.canvasElement.height = height;
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
}