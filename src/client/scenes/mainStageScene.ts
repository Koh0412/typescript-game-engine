import { Scene, CanvasScreen } from "../../engine/foundation";

import { Fighter } from "../gameObjects/fighter";
import { Enemy } from "../gameObjects/enemy/enemy";
import { EnemyHpBar } from "../gameObjects/enemy/enemyHpBar";
import { GameOverScene } from "./gameOverScene";
import { AudioAssets } from "../../engine/foundation/assets/audio";
import { TextBox } from "../../engine/UI";

export class MainStageScene extends Scene {
  fighter: Fighter;
  hpBar: EnemyHpBar;
  enemy: Enemy;

  constructor(canvas: CanvasScreen) {
    super("ステージ", canvas);
    this.fighter = new Fighter(150, 300);
    this.enemy = new Enemy(150, 100);
    this.hpBar = new EnemyHpBar(50, 20, this.enemy);

    this.addAll([this.fighter, this.enemy, this.hpBar]);
    this.setBackgroundImage("universe");

    setTimeout(() => this.bgm.play(), 1000);

    this.fighter.addEventListener("destroy", () => this.fighterDestroy());
    this.enemy.addEventListener("destroy", () => this.enemyDestroy());
  }

  get clearMessage() {
    const msg = new TextBox("クリア!", "white");
    msg.setPosition(115, 120);
    msg.setFont({ family: "serif", size: 22 });

    return msg;
  }

  get bgm() {
    const bgm = new AudioAssets("mainStage");
    bgm.setOptions({ loop: true });
    return bgm;
  }

  /**
   * 自機が倒された時の処理
   */
  fighterDestroy() {
    this.bgm.stopAndInit();
    this.changeScene(GameOverScene);
  }

  /**
   * 敵を倒した時の処理
   */
  enemyDestroy() {
    this.add(this.clearMessage);
    this.remove(this.hpBar);
  }
}