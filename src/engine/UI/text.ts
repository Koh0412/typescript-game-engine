import { CanvasScreen, Actor, Rectangle } from "../foundation";

export class Text extends Actor {
  private color: string;
  private text: string;
  private font: string;

  /**
   * テキストの配置クラス 初期ポジションはx, y共に0
   * @param text
   * @param color
   * @param font
   */
  constructor(text: string, color: string, font?: string) {
    const hitarea = new Rectangle(0, 0, 0, 0);
    super(0, 0, hitarea);
    this.color = color;
    this.text = text;
    font ? this.font = font : this.font = "";
  }

  render(targetCanvas: CanvasScreen): void {
    const context = targetCanvas.context2D;
    if (context) {
      context.font = this.font;
      context.fillStyle = this.color;
      context.fillText(this.text, this.x, this.y);
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
}