import { SpriteActor, Sprite } from "../../../engine/sprite";
import { Rectangle, GameInformation } from "../../../engine/foundation";
import { GameObjectEvent } from "../../../engine/event";

import { EnemyBullet } from "./enemyBullet";
import { EventName } from "../../common/constants/eventConst";
import { Input } from "../../../engine/UI";
import { imageName, tagName } from "../../common/constants/systemConst";

export class Enemy extends SpriteActor {
  maxHp: number;
  currentHp: number;

  private interval: number;
  private velocityX: number;
  private bulletNumber: number;
  private bulletSpeed: number;

  constructor(x: number, y: number) {
    const sprite = new Sprite(imageName.SPRITE, new Rectangle(16, 0, 16, 16));
    const hitArea = new Rectangle(0, 0, 16, 16);
    super(x, y, sprite, hitArea, [tagName.ENEMY]);

    this.maxHp = 50;
    this.currentHp = this.maxHp;

    this.interval = 120;
    this.velocityX = 0.3;
    this.bulletNumber = 15;
    this.bulletSpeed = 1;

    this.addEventListener("hit", (e) => {
      if (e.target.hasTag(tagName.PLAYER_BULLET)) {
        this.currentHp--;
        this.dispatch(EventName.CHANGE_HP, new GameObjectEvent(this));
      }
    });
  }

  update(gameInfo: GameInformation, input: Input): void {
    this.timeCount++;
    this.x += this.velocityX;
    if (this.x <= 100 || this.x >= 250) { this.velocityX *= -1; }

    if(this.timeCount > this.interval) {
      this.shootCircularBullets(this.bulletNumber, this.bulletSpeed);
      this.timeCount = 0;
    }
    if (this.currentHp <= 0) {
      this.destroy();
    }
  }

  private shootBullet(degree: number, speed: number): void {
    const rad = degree / 180 * Math.PI;
    const velocityX = Math.cos(rad) * speed;
    const velocityY = Math.sin(rad) * speed;

    const bullet = new EnemyBullet(this.x, this.y, velocityX, velocityY);
    this.spawnActor(bullet);
  }

  private shootCircularBullets(num: number, speed: number): void {
    const degree = 360 / num;
    for(let i = 0; i < num; i++) {
      this.shootBullet(degree * i, speed);
    }
  }
}
