import React, { useCallback, useEffect, useRef, useState } from 'react';
import { is } from 'ramda';
import _ from 'lodash';

import { Canvas, MultiCrops } from './components';
import styles from './RegionSelector.module.scss';
import { useDidMountEffect } from './hooks';

export interface IRegionSelectorProps {
  src?: string;
  completedCrops?: any[];
  giveCompletedCrops: (...rest) => any;
  isProportions?: boolean;
  isShowCanvas?: boolean;
  cropContent: boolean;
  maxCrops?: number;
  giveCanvas: (...rest) => any;
  width?: number;
  aspectRatio?: number;
  height: number;
}

const RegionSelector = (props: IRegionSelectorProps): React.ReactElement => {
  const {
    giveCompletedCrops,
    completedCrops = [],
    src = 'data:image/png;base64,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',
    isProportions = false,
    isShowCanvas = true,
    maxCrops = Infinity,
    giveCanvas,
    width = 500,
    aspectRatio = 0.68,
    height = width / aspectRatio,
  } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [canvas, setCanvas] = useState<any[]>([]);
  const [didMount, setDidMount] = useState<boolean>(false);

  const completed = (crops) => {
    setCanvas(crops);
    if (is(Function, giveCompletedCrops)) {
      if (isProportions) {
        giveCompletedCrops(() => crops.map((crop) => calcProportions(crop)));
      }
      if (!isProportions) {
        giveCompletedCrops(crops);
      }
    }
  };

  const calcPosition = (crop) => {
    const { width, height } = (typeof imgRef?.current !== 'undefined' && imgRef?.current) || { width: 0, height: 0 };

    return {
      ...crop,
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10),
    };
  };

  const calcProportions = (crop) => {
    const { width, height } = (typeof imgRef?.current !== 'undefined' && imgRef?.current) || { width: 0, height: 0 };
    return {
      ...crop,
      x: _.floor(crop.x / width, 3),
      y: _.floor(crop.y / height, 3),
      height: _.floor(crop.height / height, 3),
      width: _.floor(crop.width / width, 3),
    };
  };

  // useEffect(() => {
  //   if (didMount) {
  //     if (isProportions) {
  //       setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
  //     }
  //     if (!isProportions) {
  //       setCrops(completedCrops);
  //     }
  //   }
  //   setDidMount(true);
  //   return () => setDidMount(false);
  // }, [completedCrops, imgRef.current!.width]);

  useDidMountEffect(() => {
    if (isProportions) {
      setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
    }
    if (!isProportions) {
      setCrops(completedCrops);
    }
  }, [completedCrops, imgRef.current!.width]);

  const onLoad = useCallback(
    (img) => {
      imgRef.current = img.target;
      // setDidMount(true);
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
    // completed(crops);
  }, []);

  const onDelete = useCallback((crop, index, crops) => {
    setCrops(crops);
    // completed(crops);
  }, []);

  const onRestore = useCallback((crop, index, crops) => {
    setCrops(crops);
    // completed(crops);
  }, []);

  const onComplete = useCallback((crop, index, crops) => {
    setCrops(crops);
    completed(crops);
  }, []);

  return (
    <div className={styles.regionSelector}>
      <div
        style={{ width: width || imgRef.current?.width }}
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
          styles={styles}
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
        <div className={styles.canvasList} style={{ width, height: width / aspectRatio }}>
          {canvas.map((crop, i) => (
            <Canvas key={crop.id || i} crop={crop} img={imgRef.current} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
