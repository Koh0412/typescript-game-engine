import { SpriteActor, Sprite } from "../../engine/sprite";
import { Rectangle, GameInformation } from "../../engine/foundation";
import { Input } from "../../engine/UI";

export class Bullet extends SpriteActor {
  speed: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite("sprite", new Rectangle(0, 16, 16, 16));
    const hitArea = new Rectangle(4, 0, 8, 16);
    super(x, y, sprite, hitArea, ["playerBullet"]);

    this.speed = 6;

    this.addEventListener("hit", (e) => {
      if(e.target.hasTag("enemy")) {
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