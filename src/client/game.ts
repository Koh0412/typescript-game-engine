import { assets } from "../engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./config/danmakuGame";
import { resources } from "./config/resources";

assets.addResources(resources);

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.start();
});