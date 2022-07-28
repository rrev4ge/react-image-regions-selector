import React from 'react';
export declare type TCoordinateType = {
    x: number;
    y: number;
    width: number;
    height: number;
    content: any;
};
export interface ICropProps {
    coordinate: TCoordinateType;
    coordinates: TCoordinateType[];
    cropContent?: boolean;
    hasDeleteButton?: boolean;
    hasNumberIcon?: boolean;
    index: number;
    onResize: (...rest: any[]) => any | void;
    onDrag: (...rest: any[]) => any | void;
    onDelete: (...rest: any[]) => any | void;
    onChange: (...rest: any[]) => any | void;
    onComplete: (...rest: any[]) => any | void;
    onRestore: (...rest: any[]) => any | void;
    isChange: (...rest: any[]) => any | void;
    parentImg: HTMLImageElement | null;
}
export interface ICropState {
    prevCoordinate: TCoordinateType;
    prevCoordinates: TCoordinateType[];
    isLeftBtnActive: boolean;
    isRightBtnActive: boolean;
    crop: HTMLDivElement;
    outsideEvents: any;
}
declare const Crop: (props: ICropProps) => React.ReactElement;
export default Crop;
