import { Scene, CanvasScreen, GameInformation } from "../../engine/foundation";
import { TileMap } from "../../engine/sprite";
import { Input } from "../../engine/UI";
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
    this.tileMap.camera = this.createTileMapCamera();

    const fighter = new Fighter(100, 200);
    // this.add(fighter);
  }

  update(info: GameInformation, input: Input) {
    super.update(info, input);
    this.tileMap?.camera?.move(input);
  }
}