import { assets } from "./assetLoader";

export const globalAudioOptions: IGlobalAudioOptions = {
  loop: false,
  volume: 0.2,
  muted: false
};

interface IGlobalAudioOptions {
  loop: boolean;
  volume: number;
  muted: boolean;
}

export type IAudioOptions = Partial<IGlobalAudioOptions>;

export class AudioAssets {
  private name: string;

  constructor(assetsName: string) {
    this.name = assetsName;
    this.setOptions({});
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
  setOptions(options: IAudioOptions) {
    if (this.audioElement) {
      this.audioElement.loop = options.loop ?? globalAudioOptions.loop;
      this.audioElement.volume = options.volume ?? globalAudioOptions.volume;
      this.audioElement.muted = options.muted ?? globalAudioOptions.muted;
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