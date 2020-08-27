export interface IAsset {
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
  addResources(assetProps: IAsset[]): void {
    for (const prop of assetProps) {
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
   * 全ての画像をロード
   */
  async loadAll(): Promise<Map<string, HTMLElement>> {
    await Promise.all(this.promises);
    return this.assets;
  }

  private createAssetsPromise(el: HTMLElement, prop: IAsset) {
    return new Promise<HTMLElement>((resolve) => {
      el.addEventListener("load", (e) => {
        this.assets.set(prop.name, el);
        resolve(el);
      });
    });
  }
}

export const assets = new AssetLoader();