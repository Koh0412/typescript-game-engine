import { Scene, CanvasScreen } from "../../engine/foundation";

import { Fighter } from "../gameObjects/fighter";
import { Enemy } from "../gameObjects/enemy/enemy";
import { EnemyHpBar } from "../gameObjects/enemy/enemyHpBar";
import { TitleScene } from "./titleScene";

export class MainStageScene extends Scene {
  constructor(canvas: CanvasScreen) {
    super("メイン", canvas);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);
    this.addAll([fighter, enemy, hpBar]);

    fighter.addEventListener("destroy", () => {
      const titleScene = new TitleScene(this.canvas);
      this.changeScene(titleScene);
    });
  }
}