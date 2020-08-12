import { SpriteActor, Sprite } from "../../engine/sprite";
import { Rectangle, GameInformation } from "../../engine/foundation";

import { Bullet } from "./bullet";
import { Input } from "../../engine/UI";
import { imageName, tagName } from "../common/constants/systemConst";

export class Fighter extends SpriteActor {
  speed: number;

  private interval: number;
  private timeCount: number;
  private velocityX: number;
  private velocityY: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(imageName.SPRITE, new Rectangle(0, 0, 16, 16));
    const hitArea = new Rectangle(8, 8, 2, 2);
    super(x, y, sprite, hitArea);

    this.interval = 6;
    this.speed = 3;
    this.timeCount = 0;
    this.velocityX = 0;
    this.velocityY = 0;

    this.addEventListener("hit", (e) => {
      if(e.target.hasTag(tagName.ENEMY_BULLET)) {
        this.destroy();
      }
    });

  }

  update(gameInfo: GameInformation, input: Input): void {
    this.velocityX = 0;
    this.velocityY = 0;

    if(input.getKey("ArrowUp")) { this.velocityY -= this.speed; }
    if(input.getKey("ArrowDown")) { this.velocityY += this.speed; }
    if(input.getKey("ArrowRight")) { this.velocityX += this.speed; }
    if(input.getKey("ArrowLeft")) { this.velocityX -= this.speed; }

    this.x += this.velocityX;
    this.y += this.velocityY;

    const boundWidth = gameInfo.screenRectangle.width - this.width;
    const boundHeight = gameInfo.screenRectangle.height - this.height;
    const bound = new Rectangle(this.width, this.height, boundWidth, boundHeight);

    if (this.isOutOfBounds(bound)) {
      this.x -= this.velocityX;
      this.y -= this.velocityY;
    }

    this.timeCount++;
    const isFireReady = this.timeCount > this.interval;
    if (isFireReady && input.getKey(" ")) {
      const bullet = new Bullet(this.x, this.y);
      this.spawnActor(bullet);
      this.timeCount = 0;
    }
  }
}