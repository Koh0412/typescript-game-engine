import { CanvasScreen, Actor, Rectangle } from "../foundation";

interface ICanvasFont {
  size: number;
  family: string;
  style?: string;
}

type textType = "fill" | "stroke";

export class TextBox extends Actor {
  /** デフォルト: fill */
  textStyle: textType;

  private color: string;
  private text: string;
  private font: ICanvasFont;
  private canvas: CanvasScreen | undefined;
  private textWidth: number;

  /**
   * テキストの配置クラス 初期ポジションはx, y共に0
   * @param text
   * @param color
   * @param font
   */
  constructor(text: string, color: string) {
    const hitarea = new Rectangle(0, 0, 0, 0);
    super(0, 0, hitarea);
    this.color = color;
    this.text = text;
    this.font = { size: 17, family: "san-serif", style: "" };

    this.textWidth = 0;
    this.textStyle = "fill";
  }

  render(targetCanvas: CanvasScreen): void {
    this.canvas = targetCanvas;
    const context = this.canvas.context2D;

    if (context) {
      context.font = `${this.font.style} ${this.font.size}px ${this.font.family}`;

      switch (this.textStyle) {
        case "fill":
          context.fillStyle = this.color;
          context.fillText(this.text, this.x, this.y);
          break;
        case "stroke":
          context.strokeStyle = this.color;
          context.strokeText(this.text, this.x, this.y);
          break;
          default:
            break;
      }
      // context.textBaseline = "top";

      this.textWidth = context.measureText(this.text).width;
    }
  }

  /**
   * テキストの配置位置の設定
   * @param x
   * @param y
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * テキストの設定
   * @param value
   */
  setText(value: string): void {
    this.text = value;
  }

  /**
   * フォントの設定
   * @param font
   */
  setFont(font: ICanvasFont): void {
    font.style = font.style ?? "";
    this.font = font;
  }

  /**
   * テキストのセンタリング
   * update関数内で使用する
   */
  centering(): void {
    if (this.canvas) {
      this.x = (this.canvas.width - this.textWidth) / 2;
      this.y = (this.canvas.height) / 2;
    }
  }
}