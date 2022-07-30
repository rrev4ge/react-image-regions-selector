export type TCoordinateType = {
  id?: string | number;
  index?: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  [key: string]: any;
};

export interface IMultiCropsProps extends IEvents {
  coordinate?: TCoordinateType;
  coordinates?: TCoordinateType[];
  src?: string;
  height?: number;
  maxCrops?: number;
}

export interface IEvents {
  onDraw?: (...rest) => any | void;
  onDrag?: (...rest) => any | void;
  onChange: (...rest) => any | void;
  onComplete: (...rest) => any | void;
  onRestore: (...rest) => any | void;
  onDelete: (...rest) => any | void;
  onLoad: (...rest) => any | void;
  onResize?: (...rest) => any | void;
}

export interface ICropProps extends IEvents {
  coordinate: TCoordinateType;
  coordinates: TCoordinateType[];
  index: number;
  isChange: (e: any) => void;
  parentImg: HTMLImageElement | null;
  outsideEvents: any;
  cropConfig: ICropConfig;
}

export interface ICropConfig {
  hasDeleteButton?: boolean;
  hasContent?: boolean;
  hasNumberIcon?: boolean;
}

export interface IMultiCropConfig {
  hasDeleteButton?: boolean;
  hasContent?: boolean;
  hasNumberIcon?: boolean;
}

export interface IRegionSelectorProps {
  src?: string;
  completedCrops?: any[];
  maxCrops?: number;
  giveCompletedCrops?: any;
  inProportions?: boolean;
  showCanvas?: boolean;
  giveCanvas?: any;
  width?: number;
  cropConfig: ICropConfig;
}
