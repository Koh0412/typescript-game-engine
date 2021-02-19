import { assets } from "../engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./config/danmakuGame";
import gameconfig from "../../gameconfig.json";
import { IGameConfig } from "@engine/common/interfaces/system";

assets.addAll(gameconfig as IGameConfig);

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.start();
});
