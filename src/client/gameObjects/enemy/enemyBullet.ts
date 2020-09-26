import { SpriteActor, Sprite } from "@engine/sprite";
import { Rectangle, GameInformation } from "@engine/foundation";
import { Input } from "@engine/UI";
import { tagName, imageName } from "../../common/constants/systemConst";

export class EnemyBullet extends SpriteActor {
  velocityX: number;
  velocityY: number;

  constructor(x: number, y: number, velocityX: number, velocityY: number) {
    const sprite = new Sprite(imageName.SPRITE, new Rectangle(16, 16, 16, 16));
    const hitArea = new Rectangle(4, 4, 8, 8);
    super(x, y, sprite, hitArea, [tagName.ENEMY_BULLET]);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update(gameInfo: GameInformation, input: Input): void {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.isOutOfBounds(gameInfo.screenRectangle)) {
      this.destroy();
    }
  }
}
