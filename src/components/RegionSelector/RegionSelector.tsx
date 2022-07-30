import React, { useCallback, useEffect, useRef, useState } from 'react';
import { is } from 'ramda';
import MultiCrops from '../MultiCrops/MultiCrops';
import CanvasList from '../Canvas/CanvasList';
import { useDidMountEffect } from '../../hooks';
import styles from './RegionSelector.module.scss';
import CONSTANTS from '../../CONSTANTS';

export interface IRegionSelectorProps {
  src?: string;
  completedCrops?: any[];
  giveCompletedCrops?: any;
  isProportions?: boolean;
  isShowCanvas?: boolean;
  cropContent?: boolean;
  maxCrops?: number;
  giveCanvas?: any;
  width?: number;
  aspectRatio?: number;
  height?: number;
}

const RegionSelector = (props: IRegionSelectorProps): React.ReactElement => {
  const {
    giveCompletedCrops = null,
    completedCrops = [],
    src = CONSTANTS.NOT_FOUND_IMG,
    isProportions = false,
    isShowCanvas = true,
    maxCrops = 100,
    giveCanvas,
    width = 600,
    aspectRatio = 0.68,
    height = width / aspectRatio,
  } = props;

  const imgRef = useRef<HTMLImageElement>();
  const [crops, setCrops] = useState<any[]>([]);
  const [canvas, setCanvas] = useState<any[]>([]);
  const [didMount, setDidMount] = useState<boolean>(false);

  const completed = (crops) => {
    setCanvas(crops);
    if (giveCompletedCrops && is(Function, giveCompletedCrops)) {
      if (isProportions) {
        giveCompletedCrops &&
          giveCompletedCrops(() => crops.map((crop) => calcProportions(crop)));
      }
      if (!isProportions) {
        giveCompletedCrops && giveCompletedCrops(crops);
      }
    }
  };

  const calcPosition = (crop) => {
    const { width, height } = (typeof imgRef?.current !== 'undefined' &&
      imgRef?.current) || { width: 0, height: 0 };

    return {
      ...crop,
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10),
    };
  };

  const calcProportions = (crop) => {
    const { width, height } = (typeof imgRef?.current !== 'undefined' &&
      imgRef?.current) || { width: 0, height: 0 };
    const proportions = {
      ...crop,
      x: (crop.x / width).toFixed(2),
      y: (crop.y / height).toFixed(2),
      height: (crop.height / height).toFixed(2),
      width: (crop.width / width).toFixed(2),
    };
    return proportions;
  };

  useDidMountEffect(() => {
    if (didMount) {
      if (isProportions) {
        setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
      }
      if (!isProportions) {
        setCrops(completedCrops);
      }
    }
  }, [completedCrops]);

  const onLoad = useCallback(
    (img) => {
      imgRef.current = img.target;
      setDidMount(true);
      if (isProportions) {
        setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
        setCanvas(() => completedCrops.map((crop) => calcPosition(crop)));
      }
      if (!isProportions) {
        setCrops(completedCrops);
        setCanvas(completedCrops);
      }
    },
    [completedCrops, isProportions],
  );

  const onChange = useCallback((crop, index, crops) => {
    setCrops(crops);
    completed(crops);
  }, []);

  const onDelete = useCallback((crop, index, crops) => {
    setCrops(crops);
    completed(crops);
  }, []);

  const onRestore = useCallback((crop, index, crops) => {
    setCrops(crops);
    completed(crops);
  }, []);

  const onComplete = useCallback((crop, index, crops) => {
    setCrops(crops);
    completed(crops);
  }, []);

  return (
    <div className={styles.regionSelector}>
      <div
        style={{ width }}
        className={styles.multiCrops}
        onTouchEnd={() => {
          completed(crops);
        }}
        onMouseUp={(e) => {
          if (e.button === 0) {
            completed(crops);
          }
        }}
      >
        <MultiCrops
          src={src}
          coordinates={crops}
          onChange={onChange}
          onDelete={onDelete}
          onRestore={onRestore}
          onComplete={onComplete}
          onLoad={onLoad}
          width={width}
          aspectRatio={aspectRatio}
          {...props}
        />
      </div>
      {isShowCanvas && (
        <CanvasList
          canvas={canvas}
          img={imgRef.current}
          style={{ width, height: imgRef.current?.height || 0 }}
        />
      )}
    </div>
  );
};

export default RegionSelector;
