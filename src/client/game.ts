import { assets, IGameResource } from "../engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./config/danmakuGame";
import gameconfig from "../../gameconfig.json";
import { IGameConfig } from "./common/interface/userDefine";

const config = gameconfig as IGameConfig;
assets.addResources(config.resources);

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.start();
});
