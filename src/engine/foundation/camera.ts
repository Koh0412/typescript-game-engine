import { DEFAULT_CAMERA_SPEED } from "../common/constants/systemConstants";
import { TileMap, ITileProp } from "../sprite/tileMap";
import { Input } from "../UI";

export class Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  private maxX: number;
  private maxY: number;
  private velocityX: number;
  private velocityY: number;

  constructor(tileMap: TileMap, width: number, height: number, speed?: number) {
    const prop: ITileProp = tileMap.prop;

    this.x = 0;
    this.y = 0;
    this.width = width + prop.tileSize;
    this.height = height + prop.tileSize;
    this.speed = speed ?? DEFAULT_CAMERA_SPEED;

    this.maxX = prop.columns * prop.tileSize - width;
    this.maxY = prop.rows * prop.tileSize - height;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  /**
   * カメラを動かす
   * @param dirX
   * @param dirY
   */
  move(input: Input) {
    this.velocityX = 0;
    this.velocityY = 0;

    input.arrowkeyBind({
      up: () => this.velocityY -= this.speed,
      down: () => this.velocityY += this.speed,
      right: () => this.velocityX += this.speed,
      left: () => this.velocityX -= this.speed
    })

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}