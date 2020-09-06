import { imageName } from "../common/constants/systemConst";
import { IGameResource } from "../../engine/foundation";

export const resources: IGameResource[] = [
  {
    name: imageName.SPRITE,
    fileURL: "resources/img/sprite.png",
    type: "iamge",
  },
  {
    name: "mainStage",
    fileURL: "resources/audio/mainStage.mp3",
    type: "audio",
  },
  {
    name: "gameover",
    fileURL: "resources/audio/gameover.mp3",
    type: "audio",
  }
];