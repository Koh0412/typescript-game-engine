import { Scene, CanvasScreen } from "../../engine/foundation";

import { Fighter } from "../gameObjects/fighter";
import { Enemy } from "../gameObjects/enemy/enemy";
import { EnemyHpBar } from "../gameObjects/enemy/enemyHpBar";
import { GameOverScene } from "./gameOverScene";
import { AudioAssets } from "../../engine/foundation/assets/audio";

export class MainStageScene extends Scene {
  constructor(canvas: CanvasScreen) {
    super("ステージ", canvas);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);
    this.addAll([fighter, enemy, hpBar]);

    this.setBackgroundImage("universe");

    const bgm = new AudioAssets("mainStage");
    bgm.setOptions({ loop: true });
    setTimeout(() => bgm.play(), 1000);

    fighter.addEventListener("destroy", () => {
      bgm.stopAndInit();
      this.changeScene(GameOverScene);
    });
  }
}