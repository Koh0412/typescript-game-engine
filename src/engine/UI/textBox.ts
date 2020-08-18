import { CanvasScreen, Actor, Rectangle } from "../foundation";

export class TextBox extends Actor {
  private color: string;
  private text: string;
  private font: string;
  private canvas: CanvasScreen | null;
  private textWidth: number;

  /**
   * テキストの配置クラス 初期ポジションはx, y共に0
   * @param text
   * @param color
   * @param font
   */
  constructor(text: string, color: string, font?: string) {
    const hitarea = new Rectangle(0, 0, 0, 0);
    super(0, 22, hitarea);
    this.color = color;
    this.text = text;
    font ? this.font = font : this.font = "";

    this.canvas = null;
    this.textWidth = 0;
  }

  render(targetCanvas: CanvasScreen): void {
    this.canvas = targetCanvas;
    const context = this.canvas.context2D;
    if (context) {
      context.font = this.font;
      context.fillStyle = this.color;
      context.fillText(this.text, this.x, this.y);
      this.textWidth = context.measureText(this.text).width;
    }
  }

  /**
   * テキストの配置位置の設定
   * @param x
   * @param y
   */
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * テキストのセンタリング
   * update関数内で使用する
   */
  centering(): void {
    if (this.canvas) {
      this.x = (this.canvas.width - this.textWidth) / 2;
      this.y = this.canvas.height / 2;
    }
  }
}