import { assets } from "./engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./client/config/danmakuGame";
import { resources } from "./client/config/resources";

assets.addResources(resources);

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.addCanvas(game.canvas);
  game.start();
});