import React from 'react';
export interface IRegionSelectorProps {
    src?: string;
    completedCrops?: any[];
    giveCompletedCrops: (...rest: any[]) => any;
    isProportions?: boolean;
    isShowCanvas?: boolean;
    cropContent: boolean;
    maxCrops?: number;
    giveCanvas: (...rest: any[]) => any;
    width?: number;
    aspectRatio?: number;
    height: number;
}
declare const RegionSelector: (props: IRegionSelectorProps) => React.ReactElement;
export default RegionSelector;
