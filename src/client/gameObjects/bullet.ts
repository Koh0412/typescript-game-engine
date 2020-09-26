import { SpriteActor, Sprite } from "@engine/sprite";
import { Rectangle, GameInformation } from "@engine/foundation";
import { Input } from "@engine/UI";
import { tagName, imageName } from "../common/constants/systemConst";

export class Bullet extends SpriteActor {
  speed: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(imageName.SPRITE, new Rectangle(0, 16, 16, 16));
    const hitArea = new Rectangle(4, 0, 8, 16);
    super(x, y, sprite, hitArea, [tagName.PLAYER_BULLET]);

    this.speed = 6;

    this.addEventListener("hit", (e) => {
      if(e.target.hasTag(tagName.ENEMY)) {
        this.destroy();
      }
    });
  }

  update(gameInfo: GameInformation, input: Input): void {
    this.y -= this.speed;
    if(this.isOutOfBounds(gameInfo.screenRectangle)) {
      this.destroy();
    }
  }
}
