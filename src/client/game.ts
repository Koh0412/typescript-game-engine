import { assets } from "../engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./config/danmakuGame";
import { resources } from "./config/resources";
import { gameContainer } from "../engine/UI/container";

assets.addResources(resources);

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  gameContainer.add(game.canvas);
  game.start();
});