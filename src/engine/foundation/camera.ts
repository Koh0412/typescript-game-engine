import { TileMap, ITileProp } from "../sprite/tileMap";

export class Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  maxX: number;
  maxY: number;

  constructor(tileMap: TileMap, width: number, height: number) {
    const prop: ITileProp = tileMap.prop;

    this.x = 0;
    this.y = 0;
    this.width = width + prop.tileSize;
    this.height = height + prop.tileSize;

    this.maxX = prop.columns * prop.tileSize - width;
    this.maxY = prop.rows * prop.tileSize - height;
  }

  move(dirX: number, dirY: number) {
    this.x += dirX;
    this.y += dirY;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}