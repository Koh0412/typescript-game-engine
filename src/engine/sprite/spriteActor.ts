import { Actor } from "../foundation/actor";
import { Sprite } from "./sprite";
import { Rectangle } from "../foundation/display/rectangle";
import { CanvasScreen, GameInformation } from "../foundation";
import { Input } from "../UI";

export abstract class SpriteActor extends Actor {
  protected sprite: Sprite;
  protected width: number;
  protected height: number;
  protected timeCount: number;

  private context: CanvasRenderingContext2D | null = null;

  constructor(x: number, y: number, sprite: Sprite, hitArea: Rectangle, tags: string[] = []) {
    super(x, y, hitArea, tags);
    this.sprite = sprite;
    this.width = sprite.rectangle.width;
    this.height = sprite.rectangle.height;
    this.timeCount = 0;
  }

  abstract update(gameInfo: GameInformation, input: Input): void;

  render(targetCanvas: CanvasScreen): void {
    this.context = targetCanvas.context2D;
    this.drawImageWithSprite(this.sprite, this.x, this.y);
  }

  /**
   * timeCountの初期化
   */
  protected initTimeCount() {
    this.timeCount = 0;
  }

  /**
   * 画面外に出ようとしているかどうか
   * @param boundRect
   */
  protected isOutOfBounds(boundRect: Rectangle): boolean {
    const actorLeft = this.x;
    const actorRight = this.x + this.width;
    const actorTop = this.y;
    const actorBottom = this.y + this.height;

    const horizontal = (actorRight < boundRect.x || actorLeft > boundRect.width);
    const vertical = (actorBottom < boundRect.y || actorTop > boundRect.height);

    return (horizontal || vertical);
  }

  /**
   * canvas上にspriteを表示させる 表示させる位置はdx, dyで、範囲はspriteのrectangleのwidth, heightを使用する
   * @param sprite
   * @param dx
   * @param dy
   */
  private drawImageWithSprite(sprite: Sprite, dx: number, dy: number) {
    const rect = sprite.rectangle;
    const image = sprite.image;

    this.context?.drawImage(image,rect.x, rect.y, rect.width, rect.height,
    dx, dy, rect.width, rect.height);
  }
}