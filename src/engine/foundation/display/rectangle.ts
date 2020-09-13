import { Point2D } from "../../common/interfaces/system";

/**
 * 物体の位置(x, y)と幅高さ(width, height)を保持するクラス
 */
export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 矩形同士が当たったかを判定
   * @param other
   */
  collide(other: Rectangle): boolean {
    const horizontal = (other.x < this.x + this.width) &&
      (this.x < other.x + other.width);
    const vertical = (other.y < this.y + this.height) &&
      (this.y < other.y + other.height);
      return (horizontal && vertical);
  }

  /**
   * 矩形をクリックしているかどうかを判定 clickイベント時に使用
   * @param point
   */
  rectClick(point: Point2D): boolean {
    const hit = (this.x <= point.x && point.x <= this.x + this.width) &&
      (this.y <= point.y && point.y <= this.y + this.height);
    return hit;
  }
}