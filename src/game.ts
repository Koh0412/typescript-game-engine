import { assets } from "./engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./client/config/danmakuGame";
import { imageName } from "./client/common/constants/systemConst";

assets.setImagePath("resources/img");
assets.addImage(imageName.SPRITE, "sprite.png");

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.addCanvas(game.canvas);
  game.start();
});