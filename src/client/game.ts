import { assets } from "../engine/foundation/assets/assetLoader";
import { DanmakuGame } from "./config/danmakuGame";
import axios from "axios";
import { IGameConfig } from "./common/interface/userDefine";

axios.get<IGameConfig>("../../gameconfig.json")
  .then((res) => {
    const gameConfig = res.data;
    assets.addResources(gameConfig.resources);
  });

assets.loadAll().then(() => {
  const game = new DanmakuGame();
  game.start();
});
