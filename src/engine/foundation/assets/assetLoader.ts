import { IGameConfig, IGameResource } from "@engine/common/interfaces/system";

export class AssetLoader {
  private assets: Map<string, HTMLElement>;
  private promises: Promise<HTMLElement>[];

  constructor() {
    this.assets = new Map<string, HTMLElement>();
    this.promises = [];
  }

  /**
   * 全リソースをMapとして格納
   * @param assetProps
   */
  addAll(config: IGameConfig): void {
    for (const resource of config.resources) {
      const map = {
        image: () => this.imageAssetHandler(resource),
        audio: () => this.audioAssetHandler(resource),
      };

      const handler = map[resource.type];
      handler();
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

  /**
   * リソース用のアセットを作る
   * @param el
   * @param prop
   */
  private createResourceAssets(el: HTMLElement, resource: IGameResource) {
    return new Promise<HTMLElement>((resolve) => {
      addEventListener("load", () => {
        this.assets.set(resource.name, el);
        resolve(el);
      });
    });
  }

  /**
   * 画像アセット生成ハンドラ
   * @param resource 
   */
  private imageAssetHandler(resource: IGameResource) {
    const img = new Image();
    img.src = resource.fileURL;

    this.promises.push(this.createResourceAssets(img, resource));
  }

  /**
   * オーディオアセット生成ハンドラ
   * @param resource 
   */
  private audioAssetHandler(resource: IGameResource) {
    const audio = new Audio(resource.fileURL);
    this.promises.push(this.createResourceAssets(audio, resource));
  }
}

export const assets = new AssetLoader();
