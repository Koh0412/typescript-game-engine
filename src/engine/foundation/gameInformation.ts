import { Rectangle } from "./display/rectangle";

export class GameInformation {
  title: string;
  screenRectangle: Rectangle;
  mapFps: number;
  currentFps: number;

  constructor(title: string, screenRectangle: Rectangle, mapFps: number, currentFps: number) {
    this.title = title;
    this.screenRectangle = screenRectangle;
    this.mapFps = mapFps;
    this.currentFps = currentFps;
  }
}