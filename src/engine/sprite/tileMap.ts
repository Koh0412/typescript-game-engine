import { assets } from "../foundation";

interface ITileProp {
  columns: number;
  rows: number;
  /** タイルの幅高さ */
  tileSize: number;
  /** 1列のタイルの枚数 */
  tilesPerRow: number;
}

export class TileMap {
  tileProp: ITileProp;

  private tiles: number[];
  private assetName: string;

  constructor(assetName: string, tileProp: ITileProp) {
    this.assetName = assetName;
    this.tileProp = tileProp;

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
    const tileLength = this.tileProp.columns * this.tileProp.rows;
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
    return this.tiles[row * this.tileProp.columns + col];
  }

  /**
   * タイルマップを描画
   * @param ctx
   */
  drawTile(ctx: CanvasRenderingContext2D | null) {
    const tSize = this.tileProp.tileSize;

    for (let c = 0; c < this.tileProp.columns; c++) {
      for (let r = 0; r < this.tileProp.rows; r++) {
        const tile = this.getTile(c, r);

        if (tile !== 0 && ctx && this.image) {
          ctx.drawImage(
            this.image,
            Math.floor((tile - 1) % this.tileProp.tilesPerRow) * tSize,
            Math.floor((tile - 1) / this.tileProp.tilesPerRow) * tSize,
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
}