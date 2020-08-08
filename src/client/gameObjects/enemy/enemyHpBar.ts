import { Context2D, CanvasScreen } from "../../../engine/foundation";
import { Enemy } from "./enemy";
import { EventName } from "../../common/constants/eventConst";

export class EnemyHpBar extends Context2D {
  private innerWidth: number;

  constructor(x: number, y: number, enemy: Enemy) {
    super(x, y);

    this.width = 200;
    this.height = 10;

    this.innerWidth = this.width;

    enemy.addEventListener(EventName.CHANGE_HP, (e) => {
      const enemy = e.target as Enemy;
      const maxHp = enemy.maxHp;
      const hp = enemy.currentHp;
      this.innerWidth = this.width * (hp / maxHp);
    });
  }

  render(targetCanvas: CanvasScreen): void {
    const context = targetCanvas.context2D;
    if (context) {
      context.strokeStyle = "white";
      context.fillStyle = "white";
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillRect(this.x, this.y, this.innerWidth, this.height);
    }
  }
}