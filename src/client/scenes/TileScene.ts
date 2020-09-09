import { Scene, CanvasScreen } from "../../engine/foundation";
import { TileMap } from "../../engine/sprite/tileMap";
import { Fighter } from "../gameObjects/fighter";

export class TileScene extends Scene {
  constructor(canvas: CanvasScreen) {
    super("tile", canvas);

    this.tileMap = new TileMap("tiles", {
      columns: 8,
      rows: 8,
      tileSize: 64,
      tilesPerRow: 5
    });
    this.tileMap.setTiles([
      1, 3, 3, 3, 1, 1, 3, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 2, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 2, 1, 1, 1, 1,
      1, 1, 1, 1, 2, 1, 1, 1,
      1, 1, 1, 1, 2, 1, 1, 1,
      1, 1, 1, 1, 2, 1, 1, 1
    ]);

    const fighter = new Fighter(100, 200);
    this.add(fighter);
  }
}