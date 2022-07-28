import React, { CSSProperties } from 'react';
import { TCoordinateType } from './Crop/Crop';
export interface IMultiCropsProps {
    coordinate?: TCoordinateType;
    coordinates?: TCoordinateType[];
    src?: string;
    cropContent: boolean;
    hasDeleteButton?: boolean;
    hasNumberIcon?: boolean;
    width: number;
    height?: number;
    onDraw?: (...rest: any[]) => any | void;
    onChange: (...rest: any[]) => any | void;
    onComplete: (...rest: any[]) => any | void;
    onRestore: (...rest: any[]) => any | void;
    onDelete: (...rest: any[]) => any | void;
    onLoad: (...rest: any[]) => any | void;
    inProportions?: boolean;
    maxCrops?: number;
    aspectRatio: number;
    styles?: CSSProperties;
}
declare const MultiCrops: (props: IMultiCropsProps) => React.ReactElement;
export { removeId, addId } from './utils';
export default MultiCrops;
