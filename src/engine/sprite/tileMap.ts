import { assets } from "../foundation";

export class TileMap {
  columns: number;
  rows: number;
  tileSize: number;
  tiles: number[];

  private assetName: string;

  constructor(assetName: string, cols: number, rows: number, tileSize: number) {
    this.assetName = assetName;
    this.columns = cols;
    this.rows = rows;
    this.tileSize = tileSize;

    this.tiles = [];
  }

  /**
   * アセットの取得
   */
  get image(): HTMLImageElement | undefined {
    return assets.getAsImage(this.assetName);
  }

  /**
   * タイルマップをセット
   * @param tiles
   */
  setTiles(tiles: number[]) {
    const tileLength = this.columns * this.rows;
    if (tiles.length === tileLength) {
      this.tiles = tiles;
    } else {
      if (tiles.length < tileLength) {
        console.error(`tile length: ${tiles.length} Too few tiles. please set the length multiplied by columns and rows.`)
      }
      if (tiles.length > tileLength) {
        console.error(`tile length: ${tiles.length} Too many tiles. please set the length multiplied by columns and rows.`)
      }
    }
  }

  /**
   * タイルを取得
   * @param col
   * @param row
   */
  getTile(col: number, row: number) {
    return this.tiles[row * this.columns + col];
  }

  /**
   * タイルマップを描画
   * @param ctx
   */
  drawTile(ctx: CanvasRenderingContext2D | null) {
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows; r++) {
        const tile = this.getTile(c, r);
        if (tile !== 0 && ctx && this.image) {
          ctx.drawImage(
            this.image,
            (tile - 1) * this.tileSize,
            0,
            this.tileSize,
            this.tileSize,
            c * this.tileSize,
            r * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }
}