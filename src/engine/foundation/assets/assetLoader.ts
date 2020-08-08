export class AssetLoader {
  private assets: Map<string, HTMLImageElement>;
  private promises: Promise<HTMLImageElement>[];

  constructor() {
    this.assets = new Map<string, HTMLImageElement>();
    this.promises = [];
  }

  /**
   * 画像をMapとして格納、promiseを配列に追加する
   * @param name
   * @param fileName
   */
  addImage(name: string, fileName: string): void {
    const img = new Image();
    img.src = `resources/img/${fileName}`;

    const promise = new Promise<HTMLImageElement>((resolve) => {
      img.addEventListener("load", (e) => {
        this.assets.set(name, img);
        resolve(img);
      });
    });

    this.promises.push(promise);
  }

  /**
   * `name`の画像を取得
   * @param name
   */
  get(name: string): HTMLImageElement | undefined {
    return this.assets.get(name);
  }

  /**
   * 全ての画像をロード
   */
  async loadAll(): Promise<Map<string, HTMLImageElement>> {
    await Promise.all(this.promises);
    return this.assets;
  }
}

export const assets = new AssetLoader();