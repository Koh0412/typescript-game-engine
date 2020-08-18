export class AssetLoader {
  private assets: Map<string, HTMLImageElement>;
  private promises: Promise<HTMLImageElement>[];
  private imagePath: string;

  constructor() {
    this.assets = new Map<string, HTMLImageElement>();
    this.promises = [];
    this.imagePath = "";
  }

  /**
   * 画像をMapとして格納、promiseを配列に追加する
   * pathをセットしている場合はファイル名 そうでない場合はファイルパスでセット
   * @param name
   * @param fileName
   */
  addImage(name: string, fileName: string): void {
    const img = new Image();
    if (fileName.includes("/")) {
      img.src = fileName;
    } else {
      img.src = this.imagePath + fileName;
    }

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

  /**
   * 画像があるフォルダのパスをセット
   * @param path
   */
  setImagePath(path: string): void {
    this.imagePath = path + "/";
  }
}

export const assets = new AssetLoader();