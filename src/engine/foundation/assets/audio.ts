import { assets } from "./assetLoader";

export class AudioAssets {
  private name: string;

  constructor(assetsName: string) {
    this.name = assetsName;
  }

  private get audio() {
    const audio = assets.getAsAudio(this.name);
    if (!audio) {
      console.error(`assets name: ${this.name} is not exists.`);
      return;
    }
    return audio;
  }

  /**
   * オーディオの再生
   */
  play() {
    if (!this.audio) {
      return;
    }
    this.audio.play();
  }

  /**
   * オーディオをストップし時間を初期化
   */
  stopAndInit() {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    this.audio.currentTime = 0;
  }

}