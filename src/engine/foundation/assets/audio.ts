import { assets } from "./assetLoader";

interface IAutioOptions {
  loop?: boolean;
  volume?: number;
}

export class AudioAssets {
  private name: string;

  constructor(assetsName: string) {
    this.name = assetsName;
  }

  private get audioElement() {
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
    this.audioElement?.play();
  }

  /**
   * オーディオをストップし時間を初期化
   */
  stopAndInit() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  /**
   * 詳細な属性を設定
   * @param options
   */
  setOptions(options: IAutioOptions) {
    if (this.audioElement) {
      this.audioElement.loop = options.loop ?? false;
      this.audioElement.volume = options.volume ?? 0.3;
    }
  }

  /**
   * オーディオ関連のイベントリスナ
   *
   * @param type
   * @param listener
   * @param options
   */
  addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
    this.audioElement?.addEventListener(type, listener, options);
  }
}