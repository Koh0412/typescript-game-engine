import { CanvasScreen } from "../foundation";

class GameContainer {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.style.display = "inline-flex";
    this.container.style.position = "relative";

    document.body.appendChild(this.container);
  }

  /**
   * コンテナ内にキャンバスを追加していく
   * @param canvases
   */
  add(...canvases: CanvasScreen[]): void {
    for (const canvas of canvases) {
      this.container.appendChild(canvas.element);
    }
  }
}

export const gameContainer = new GameContainer();