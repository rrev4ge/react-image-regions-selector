import React, { useCallback, useEffect, useRef, useState } from 'react';
import { is } from 'ramda';
import MultiCrops from '../MultiCrops/MultiCrops';
import CanvasList from '../Canvas/CanvasList';
import { useDidMountEffect } from '../../hooks';
import styles from './RegionSelector.module.scss';
import { IRegionSelectorProps } from '../../models';
import CONSTANTS from '../../CONSTANTS';

const RegionSelector = (props: IRegionSelectorProps): React.ReactElement => {
  const {
    src,
    giveCompletedCrops = null,
    completedCrops = [],
    inProportions = false,
    showCanvas = true,
    giveCanvas,
    width = 460,
    maxCrops = CONSTANTS.MAX_CROPS,
  } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [canvas, setCanvas] = useState<any[]>([]);
  const [didMount, setDidMount] = useState<boolean>(false);

  const completed = (crops) => {
    setCanvas(crops);
    if (giveCompletedCrops && is(Function, giveCompletedCrops)) {
      if (inProportions) {
        giveCompletedCrops &&
          giveCompletedCrops(crops.map((crop) => calcProportions(crop)));
      }
      if (!inProportions) {
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
    if (didMount && completedCrops) {
      if (inProportions) {
        setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
      }
      if (!inProportions) {
        setCrops(completedCrops);
      }
    }
  }, []);

  const onLoad = useCallback(
    (img) => {
      imgRef.current = img.target;
      setDidMount(true);
      if (inProportions) {
        setCrops(() => completedCrops.map((crop) => calcPosition(crop)));
        setCanvas(() => completedCrops.map((crop) => calcPosition(crop)));
      }
      if (!inProportions) {
        setCrops(completedCrops);
        setCanvas(completedCrops);
      }
    },
    [completedCrops, inProportions],
  );

  const onChange = useCallback((crop, index, crops) => {
    setCrops(crops);
    // completed(crops);
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
          width={imgRef.current?.width || width}
          {...props}
        />
      </div>
      {showCanvas && (
        <CanvasList
          canvas={canvas}
          img={imgRef.current}
          style={{
            width,
            height: imgRef.current?.height ? imgRef.current.height + 10 : 0,
          }}
        />
      )}
    </div>
  );
};

export default RegionSelector;
