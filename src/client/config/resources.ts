import { audioName, imageName } from "../common/constants/systemConst";
import { IGameResource } from "../../engine/foundation";

export const resources: IGameResource[] = [
  {
    name: imageName.SPRITE,
    fileURL: "resources/img/sprite.png",
    type: "iamge",
  },
  {
    name: imageName.UNIVERSE,
    fileURL: "resources/img/universe.jpg",
    type: "iamge",
  },
  {
    name: imageName.TILES,
    fileURL: "resources/img/tiles.png",
    type: "iamge",
  },
  {
    name: audioName.MAIN_STAGE,
    fileURL: "resources/audio/mainStage.mp3",
    type: "audio",
  },
  {
    name: audioName.GAMEOVER,
    fileURL: "resources/audio/gameover.mp3",
    type: "audio",
  }
];