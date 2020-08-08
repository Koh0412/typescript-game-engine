import { Rectangle } from "../foundation/display/rectangle";
import { assets } from "../foundation/assets/assetLoader";

export class Sprite {
  rectangle: Rectangle;

  private imageName: string;

  /**
   * `imageName`にはaddImageした名前が入る
   * @param imageName
   * @param rectangle
   */
  constructor(imageName: string, rectangle: Rectangle) {
    this.imageName = imageName;
    this.rectangle = rectangle;
  }

  get image(): CanvasImageSource {
    return assets.get(this.imageName) as CanvasImageSource;
  }
}