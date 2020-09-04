import { Scene, CanvasScreen } from "../../engine/foundation";

import { Fighter } from "../gameObjects/fighter";
import { Enemy } from "../gameObjects/enemy/enemy";
import { EnemyHpBar } from "../gameObjects/enemy/enemyHpBar";
import { TitleScene } from "./titleScene";

export class MainStageScene extends Scene {
  constructor(canvas: CanvasScreen) {
    super("ステージ", canvas);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);
    this.addAll([fighter, enemy, hpBar]);

    fighter.addEventListener("destroy", () => {
      const titleScene = new TitleScene(canvas);
      this.changeScene(titleScene);
    });

    this.addEventListener("click", (e) => {
      const isClickFighter = fighter.hitArea.rectClickTest(e.target.point);
      if (isClickFighter) {
        this.setBackgroundColor("green");
      }
    });
  }
}