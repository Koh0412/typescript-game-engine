import { Rectangle } from "./display/rectangle";

export interface IGameInfo {
  title: string;
  screenRectangle: Rectangle;
  mapFps: number;
  currentFps: number;
  globalBackroundColor?: string;
}

export class GameInformation {
  title: string;
  screenRectangle: Rectangle;
  mapFps: number;
  currentFps: number;
  globalBackgroundColor: string | undefined;

  constructor(info: IGameInfo) {
    this.title = info.title;
    this.screenRectangle = info.screenRectangle;
    this.mapFps = info.mapFps;
    this.currentFps = info.currentFps;
    this.globalBackgroundColor = info.globalBackroundColor;
  }
}