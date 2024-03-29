import React, { useRef, useState } from 'react';
import { addIndex, both, clone, complement, equals, is, map } from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import Crop from './Crop/Crop';
import styles from './MultiCrops.module.scss';
import { IMultiCropsProps } from '../../models';
import CONSTANTS from '../../CONSTANTS';

const isValidPoint = (point: { x?: number; y?: number } = {}): boolean => {
  const strictNumber = (number) =>
    both(is(Number), complement(equals(NaN)))(number);
  if (point?.x && point?.y) {
    return strictNumber(point.x) && strictNumber(point.y);
  }
  return false;
};

const MultiCrops = (props: IMultiCropsProps): React.ReactElement => {
  const {
    coordinate,
    coordinates = [],
    src = '',
    maxRegionListLength = CONSTANTS.MAX_REGION_LIST_LENGTH,
    onDraw,
    onChange,
    onComplete,
    onRestore,
    onLoad,
  } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [drawingIndex, setDrawingIndex] = useState(-1);
  const [pointA, setPointA] = useState<{ x?: number; y?: number }>({});

  const [id, setId] = useState(uuidv4());

  const [prevCoordinate, setPrevCoordinate] = useState({});
  const [prevCoordinates, setPrevCoordinates] = useState([]);

  const [isEscBtnTarget, setIsEscBtnTarget] = useState(false);
  const [isDragResize, setIsDragResize] = useState(false);
  const [isLeftBtnTarget, setIsLeftBtnTarget] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(false);

  const isChange = (e) => {
    if (['dragstart', 'resizestart'].includes(e.type)) {
      setIsDragResize(true);
    }
    if (['dragend', 'resizeend'].includes(e.type)) {
      setIsDragResize(false);
    }
  };

  const renderCrops = (props): any => {
    const { coordinates } = props;
    const indexedMap = addIndex(map);
    return indexedMap((coor, index) => {
      return (
        <Crop
          // improve performance when delete crop in middle array
          key={coor.id || index}
          index={index}
          coordinate={coor}
          isChange={(e) => {
            isChange(e);
          }}
          parentImg={imgRef.current}
          {...props}
        />
      );
    })(coordinates);
  };

  const getCursorPosition = (e) => {
    const { left, top } = containerRef.current!.getBoundingClientRect();
    if (e.type === 'touchstart' || e.type === 'touchmove') {
      return {
        x: e.touches[0].pageX - left,
        y: e.touches[0].pageY - top,
      };
    }
    if (e.type === 'mousedown' || e.type === 'mousemove') {
      return {
        x: e.clientX - left,
        y: e.clientY - top,
      };
    }
    return { x: 0, y: 0 };
  };

  const handleMouseDown = (e) => {
    document.removeEventListener('mouseup', outsideEvents, false);
    document.removeEventListener('keydown', outsideEvents, false);
    document.removeEventListener('contextmenu', onContextMenu, false);
    setIsDragResize(false);
    if (
      coordinates.length < maxRegionListLength &&
      (e.button === 0 || e.type === 'touchstart')
    ) {
      setIsLeftBtnTarget(true);
      if (e.target === imgRef.current || e.target === containerRef.current) {
        const { x, y } = getCursorPosition(e);
        setDrawingIndex(coordinates.length);
        setPointA({ x, y });
        setId(uuidv4());
        setIsLeftBtnTarget(true);
        setPrevCoordinate({});
        setPrevCoordinates(clone(coordinates));
        setIsEscBtnTarget(false);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (
      coordinates.length <= maxRegionListLength &&
      (e.button === 0 || e.type === 'touchmove')
    ) {
      if (
        isValidPoint(pointA) &&
        e.target.offsetParent === imgRef?.current?.offsetParent
      ) {
        const pointB = getCursorPosition(e);
        // get the drawing coordinate
        if (pointA.x && pointA.y) {
          const coordinate = {
            x: Math.min(pointA.x, pointB.x),
            y: Math.min(pointA.y, pointB.y),
            width: Math.abs(pointA.x - pointB.x),
            height: Math.abs(pointA.y - pointB.y),
            id,
          };

          const nextCoordinates = clone(coordinates);
          nextCoordinates[drawingIndex] = coordinate;
          if (onDraw && is(Function, onDraw)) {
            onDraw(coordinate, drawingIndex, nextCoordinates);
          }
          if (is(Function, onChange)) {
            onChange(coordinate, drawingIndex, nextCoordinates);
          }
        }
      }
    }
  };

  const restoreCrops = () => {
    if (is(Function, onRestore)) {
      onRestore(prevCoordinate, drawingIndex - 1, prevCoordinates);
    }

    setPointA({ x: 0, y: 0 });
    setIsLeftBtnTarget(false);
    setIsEscBtnTarget(false);
  };

  const handleMouseUp = () => {
    setPointA({ x: 0, y: 0 });
    setIsLeftBtnTarget(false);
    setMouseLeave(false);
    setIsEscBtnTarget(false);
  };

  const handleMouseLeave = () => {
    if (isDragResize === false && isLeftBtnTarget === true) {
      document.addEventListener('contextmenu', onContextMenu, false);
      document.addEventListener('mouseup', outsideEvents, false);
      document.addEventListener('keydown', outsideEvents, false);
    }
    setMouseLeave(true);
  };

  const handleMouseEnter = () => {
    document.removeEventListener('mouseup', outsideEvents, false);
    document.removeEventListener('keydown', outsideEvents, false);
    document.removeEventListener('contextmenu', onContextMenu, false);
    setMouseLeave(false);
  };

  const outsideEvents = (e): void | boolean => {
    if (e.button === 0) {
      if (isEscBtnTarget === false) {
        if (is(Function, onRestore)) {
          onRestore(coordinate, drawingIndex, coordinates);
        }
        handleMouseUp();
      }
      if (isEscBtnTarget === true && e.target !== imgRef.current) {
        restoreCrops();
        setIsEscBtnTarget(false);
      }
      document.removeEventListener('mouseup', outsideEvents, false);
      document.removeEventListener('keydown', outsideEvents, false);
      document.removeEventListener('contextmenu', onContextMenu, false);
    }

    if (e.code === 'Escape') {
      setIsEscBtnTarget(true);
    }

    if (e.button === 2) {
      if (e.target !== imgRef.current) {
        restoreCrops();
      }
    }
    return false;
  };

  const onKeyDown = (e) => {
    if (e.code === 'Escape') {
      setIsEscBtnTarget(true);
    }
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div
      className={styles.multiCrops}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={() => {
        if (!isEscBtnTarget) {
          handleMouseUp();
          return;
        }
        restoreCrops();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onKeyDown={onKeyDown}
      onMouseUp={() => {
        if (!isEscBtnTarget) {
          handleMouseUp();
          return;
        }
        restoreCrops();
      }}
      ref={(container) => {
        containerRef.current = container;
      }}
      tabIndex={0}
    >
      {src && (
        <img
          ref={(img) => {
            imgRef.current = img;
          }}
          width="100%"
          src={src}
          onLoad={onLoad}
          alt=""
          draggable={false}
          onDragStart={(e) => {
            e.preventDefault();
          }}
        />
      )}
      {renderCrops(props)}
    </div>
  );
};

export { removeId, addId } from './utils';
export default MultiCrops;
