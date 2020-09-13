import { assets, Camera } from "../foundation";

export interface ITileProp {
  columns: number;
  rows: number;
  /** タイルの幅高さ */
  tileSize: number;
  /** 使用する画像における1列のタイルの枚数 */
  tilesPerRow: number;
}

export class TileMap {
  prop: ITileProp;
  camera: Camera | undefined;

  private tiles: number[];
  private assetName: string;

  constructor(assetName: string, prop: ITileProp) {
    this.assetName = assetName;
    this.prop = prop;

    this.tiles = [];
  }

  /**
   * アセットの取得
   */
  private get image(): HTMLImageElement | undefined {
    return assets.getAsImage(this.assetName);
  }

  /**
   * タイルマップをセット
   * @param tiles
   */
  setTiles(tiles: number[]) {
    const multiplied = this.prop.columns * this.prop.rows;
    const necessary = Math.abs(multiplied - tiles.length);

    if (tiles.length === multiplied) {
      this.tiles = tiles;
    } else {
      if (tiles.length < multiplied) {
        console.error(`tile length -> ${tiles.length}: Too few tiles. please add ${necessary} tile.`);
      }
      if (tiles.length > multiplied) {
        console.error(`tile length -> ${tiles.length} Too many tiles. please remove ${necessary} tile.`)
      }
    }
  }

  /**
   * タイルを取得
   * @param col
   * @param row
   */
  getTile(col: number, row: number) {
    return this.tiles[row * this.prop.columns + col];
  }

  /**
   * タイルマップを描画
   * @param ctx
   */
  drawTile(ctx: CanvasRenderingContext2D | null) {
    if (this.camera) {
      this.drawTileWithCamera(ctx);
    } else {
      this.drawTileNoCamera(ctx);
    }
  }

  /**
   * カメラなしでのタイル描画
   * @param ctx
   */
  private drawTileNoCamera(ctx: CanvasRenderingContext2D | null) {
    const tSize = this.prop.tileSize;

    for (let c = 0; c < this.prop.columns; c++) {
      for (let r = 0; r < this.prop.rows; r++) {
        const tile = this.getTile(c, r);

        //tile === 0 は空タイル
        if (tile !== 0 && ctx && this.image) {
          ctx.drawImage(
            this.image,
            // TODO: 適切な説明
            Math.floor((tile - 1) % this.prop.tilesPerRow) * tSize,
            Math.floor((tile - 1) / this.prop.tilesPerRow) * tSize,
            tSize,
            tSize,
            c * tSize,
            r * tSize,
            tSize,
            tSize
          );
        }
      }
    }
  }

  /**
   * カメラありのタイル描画
   * @param ctx
   */
  private drawTileWithCamera(ctx: CanvasRenderingContext2D | null) {
    if (!this.camera) {
      return;
    }
    const tSize = this.prop.tileSize;

    const startCol = Math.floor(this.camera.x / tSize);
    const endCol = startCol + (this.camera.width / tSize);

    const startRow = Math.floor(this.camera.y / tSize);
    const endRow = startRow + (this.camera.height / tSize);

    const offsetX = -this.camera.x + startCol * tSize;
    const offsetY = -this.camera.y + startRow * tSize;

    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = this.getTile(c, r);
        const x = (c - startCol) * tSize + offsetX;
        const y = (r - startRow) * tSize + offsetY;
        //tile === 0 は空タイル
        if (tile !== 0 && ctx && this.image) {
          ctx.drawImage(
            this.image,
            // TODO: 適切な説明
            Math.floor((tile - 1) % this.prop.tilesPerRow) * tSize,
            Math.floor((tile - 1) / this.prop.tilesPerRow) * tSize,
            tSize,
            tSize,
            Math.round(x),
            Math.round(y),
            tSize,
            tSize
          );
        }
      }
    }
  }
}