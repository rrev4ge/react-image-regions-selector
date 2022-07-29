import React, { useCallback, useEffect, useRef, useState } from 'react';
import { is } from 'ramda';
import PropTypes from 'prop-types';
import styles from './RegionSelector.module.scss';
import CanvasList from '../Canvas/CanvasList';
import MultiCrops from '../MultiCrops/MultiCrops';
import { useDidMountEffect } from '../../hooks';

const RegionSelectorOld = (props) => {
  const { src, width, setCompletedCrops, completedCrops, isProportions, isShowCanvas } = props;
  const imgRef = useRef(null);
  const [crops, setCrops] = useState([]);
  const [canvas, setCanvas] = useState([]);
  const [didMount, setDidMount] = useState(false);

  const completed = (crops) => {
    setCanvas(crops);
    if (is(Function, setCompletedCrops)) {
      if (isProportions) {
        setCompletedCrops(() => crops.map((crop) => calcProportions(crop)));
      }
      if (!isProportions) {
        setCompletedCrops(crops);
      }
    }
  };

  const calcPosition = (crop) => {
    const { width, height } = imgRef.current;

    const proportions = {
      ...crop,
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10),
    };
    return proportions;
  };

  const calcProportions = (crop) => {
    const { width, height } = imgRef.current;

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

  // useEffect(()=>{
  //   if (didMount) {
  //     if (isProportions) {
  //       setCrops(()=>completedCrops.map((crop)=>calcPosition(crop)))
  //     }
  //     if (!isProportions) {
  //       setCrops(completedCrops);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [completedCrops])

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
        className={styles.multiCropsField}
        onTouchEnd={(e) => {
          completed(crops);
        }}
        onClick={(e) => {
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
          {...props}
        />
      </div>
      {isShowCanvas && (
        <CanvasList canvas={canvas} img={imgRef.current} style={{ width, height: imgRef.current?.height || 0 }} />
      )}
    </div>
  );
};

const { string, array, bool, func, number } = PropTypes;

RegionSelectorOld.propTypes = {
  src: string,
  completedCrops: array,
  setCompletedCrops: func,
  isProportions: bool,
  isShowCanvas: bool,
  cropContent: bool,
  maxCrops: number,
  setCanvasImg: func,
  width: number,
};

RegionSelectorOld.defaultProps = {
  setCompletedCrops: null,
  completedCrops: [],
  src: '',
  isProportions: false,
  isShowCanvas: true,
  maxCrops: Infinity,
  setCanvasImg: null,
  width: 600,
};

export default RegionSelectorOld;
