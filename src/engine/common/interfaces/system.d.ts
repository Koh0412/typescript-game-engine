export interface Point2D {
  x: number;
  y: number;
}

export interface IGameResource {
  name: string;
  fileURL: string;
  type: "image" | "audio";
}

export interface IGameMap {
  name: string;
  field: number[];
}

export interface IGameConfig {
  resources: IGameResource[];
  // maps: IGameMap[];
}
