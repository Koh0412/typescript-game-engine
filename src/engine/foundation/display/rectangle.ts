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
   * sprite同士が当たったかを判定
   * @param other
   */
  hitTest(other: Rectangle) {
    const horizontal = (other.x < this.x + this.width) &&
      (this.x < other.x + other.width);
    const vertical = (other.y < this.y + this.height) &&
      (this.y < other.y + other.height);
      return (horizontal && vertical);
  }
}