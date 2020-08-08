import { Actor } from "../foundation/actor";
import { Sprite } from "./sprite";
import { Rectangle } from "../foundation/display/rectangle";
import { CanvasScreen, GameInformation } from "../foundation";
import { Input } from "../event";

export abstract class SpriteActor extends Actor {
  sprite: Sprite;
  width: number;
  height: number;

  constructor(x: number, y: number, sprite: Sprite, hitArea: Rectangle, tags: string[] = []) {
    super(x, y, hitArea, tags);
    this.sprite = sprite;
    this.width = sprite.rectangle.width;
    this.height = sprite.rectangle.height;
  }

  render(targetCanvas: CanvasScreen): void {
    const context = targetCanvas.context2D;
    const rect = this.sprite.rectangle;
    if (context) {
      context.drawImage(this.sprite.image,
        rect.x, rect.y, rect.width, rect.height,
      this.x, this.y, rect.width, rect.height);
    }
  }

  abstract update(gameInfo: GameInformation, input: Input): void;

  /**
   * 画面外に出ようとしているかどうか
   * @param boundRect
   */
  isOutOfBounds(boundRect: Rectangle): boolean {
    const actorLeft = this.x;
    const actorRight = this.x + this.width;
    const actorTop = this.y;
    const actorBottom = this.y + this.height;

    const horizontal = (actorRight < boundRect.x || actorLeft > boundRect.width);
    const vertical = (actorBottom < boundRect.y || actorTop > boundRect.height);

    return (horizontal || vertical);
  }
}