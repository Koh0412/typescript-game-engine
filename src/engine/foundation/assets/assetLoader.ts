export interface IGameResource {
  name: string;
  fileURL: string;
  type: "iamge" | "audio";
}

export class AssetLoader {
  private assets: Map<string, HTMLElement>;
  private promises: Promise<HTMLElement>[];

  constructor() {
    this.assets = new Map<string, HTMLElement>();
    this.promises = [];
  }

  /**
   * リソースをMapとして格納
   * @param assetProps
   */
  addResources(resourceProps: IGameResource[]): void {
    for (const prop of resourceProps) {
      switch (prop.type) {
        case "iamge":
          const img = new Image();
          img.src = prop.fileURL;

          this.promises.push(this.createAssetsPromise(img, prop));
          break;
        case "audio":
          const audio = new Audio(prop.fileURL);
          this.promises.push(this.createAssetsPromise(audio, prop));
          break;
        default:
          break;
      }
    }
  }

  /**
   * `name`の画像を取得
   * @param name
   */
  get(name: string): HTMLElement | undefined {
    return this.assets.get(name);
  }

  /**
   * `name`の画像をimageとして取得
   * @param name
   */
  getAsImage(name: string): HTMLImageElement | undefined {
    return this.assets.get(name) as HTMLImageElement;
  }

  /**
   * `name`の画像をaudioとして取得
   * @param name
   */
  getAsAudio(name: string): HTMLAudioElement | undefined {
    return this.assets.get(name) as HTMLAudioElement;
  }

  /**
   * 全ての画像をロード
   */
  async loadAll(): Promise<Map<string, HTMLElement>> {
    await Promise.all(this.promises);
    return this.assets;
  }

  private createAssetsPromise(el: HTMLElement, prop: IGameResource) {
    return new Promise<HTMLElement>((resolve) => {
      addEventListener("load", () => {
        this.assets.set(prop.name, el);
        resolve(el);
      });
    });
  }
}

export const assets = new AssetLoader();