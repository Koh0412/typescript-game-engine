import { assets } from "./engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./client/danmakuGame";

assets.addImage("sprite", "sprite.png");
assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.addCanvas(game.canvas);
  game.start();
});