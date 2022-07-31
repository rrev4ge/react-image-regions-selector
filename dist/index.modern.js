import React, { Component, useRef, useState, useEffect, useCallback } from 'react';
import { update, is, remove, equals, map, assoc, omit, addIndex, clone, both, complement } from 'ramda';
import { v4 } from 'uuid';
import interact from 'interactjs';

var styles = {"rmcIconContainer":"_Crop-module__rmcIconContainer__17jGb","rmcRemove":"_Crop-module__rmcRemove__2D0hp","numberIcon":"_Crop-module__numberIcon__3R7bI","cropContent":"_Crop-module__cropContent__21A1G","ordN":"_Crop-module__ordN__19ntT","ordNe":"_Crop-module__ordNe__1Zl9b","ordNw":"_Crop-module__ordNw__3C514","ordS":"_Crop-module__ordS__2tvc1","ordSe":"_Crop-module__ordSe__1sWTP","ordSw":"_Crop-module__ordSw__2HC6Y","ordE":"_Crop-module__ordE__3L_y_","ordW":"_Crop-module__ordW__K3lk6","ord-n":"_Crop-module__ord-n__36aZb","ord-e":"_Crop-module__ord-e__MMQaN","ord-s":"_Crop-module__ord-s__qAshv","ord-w":"_Crop-module__ord-w__2RsOK"};

const CropDeleteIcon = props => /*#__PURE__*/React.createElement("div", Object.assign({
  className: styles.rmcIconContainer
}, props), /*#__PURE__*/React.createElement("div", {
  className: styles.rmcRemove
}));
const CropNumberIcon = ({
  number: _number = ''
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.numberIcon
}, _number);
const CropContent = ({
  content
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.cropContent
}, content);

class Crop extends Component {
  constructor() {
    super(...arguments);
    this.prevCoordinate = null;
    this.prevCoordinates = [];
    this.isLeftBtnActive = false;
    this.isRightBtnActive = false;
    this.crop = null;

    this.handleChange = e => {
      const {
        index,
        coordinate,
        coordinate: {
          x,
          y
        },
        coordinates,
        onResize,
        onDrag,
        onChange,
        onComplete,
        isChange,
        parentImg
      } = this.props;
      const {
        dx,
        dy
      } = e;
      let nextCoordinate = {};

      if (e.type === 'resizemove') {
        const {
          rect: {
            width,
            height
          },
          deltaRect: {
            left,
            top,
            right,
            bottom
          }
        } = e;
        const resizeCoordinate = { ...((x + left >= 0 && x + left + width < parentImg.width || x + left >= 0 && left < 0) && {
            x: x + left
          }),
          ...((y + top >= 0 && y + top + height < parentImg.height || y + top >= 0 && top < 0) && {
            y: y + top
          })
        };
        const resize = {
          width: resizeCoordinate.x + width <= parentImg.width ? x + left <= 0 && right === 0 ? coordinate.width : width : coordinate.width,
          height: resizeCoordinate.y + height <= parentImg.height ? y + top <= 0 && bottom === 0 ? coordinate.height : height : coordinate.height
        };
        nextCoordinate = { ...coordinate,
          ...resizeCoordinate,
          ...resize
        };
      }

      if (e.type === 'dragmove') {
        nextCoordinate = { ...coordinate,
          x: x + dx,
          y: y + dy
        };
      }

      const nextCoordinates = update(index, nextCoordinate)(coordinates);

      if (onResize && is(Function, onResize) && e.type === 'resizemove') {
        onResize(nextCoordinate, index, nextCoordinates);
      }

      if (is(Function, onChange) && ['dragmove', 'resizemove'].includes(e.type)) {
        onChange(nextCoordinate, index, nextCoordinates);
      }

      if (onDrag && is(Function, onDrag) && e.type === 'dragmove') {
        onDrag(nextCoordinate, index, nextCoordinates);
      }

      if (['dragend', 'resizeend'].includes(e.type)) {
        onComplete(coordinate, index, coordinates);
        isChange(e);
        document.removeEventListener('contextmenu', this.onContextMenu, false);
      }
    };

    this.changeStartPosition = e => {
      const {
        index,
        coordinate,
        coordinates,
        isChange
      } = this.props;

      if (['dragstart', 'resizestart'].includes(e.type)) {
        document.addEventListener('contextmenu', this.onContextMenu, false);
        this.prevCoordinate = { ...coordinate
        };
        this.prevCoordinates = [...coordinates];
        this.prevCoordinates = update(index, this.prevCoordinate, coordinates);
        isChange(e);
      }
    };

    this.handleRestore = () => {
      const {
        index,
        onRestore
      } = this.props;

      if (is(Function, onRestore)) {
        onRestore(this.prevCoordinate, index, this.prevCoordinates);
      }
    };

    this.handleDelete = () => {
      const {
        index,
        coordinate,
        onDelete,
        coordinates
      } = this.props;
      const nextCoordinates = remove(index, 1)(coordinates);

      if (is(Function, onDelete)) {
        onDelete(coordinate, index, nextCoordinates);
      }
    };

    this.onContextMenu = e => {
      e.preventDefault();
      e.stopPropagation();

      if (e.button === 2) {
        if (this.isLeftBtnActive === false) {
          this.handleDelete();
        }

        if (this.isLeftBtnActive === true) {
          this.handleRestore();
          this.isLeftBtnActive = false;
        }
      }

      return false;
    };

    this.onMouseDown = e => {
      const {
        outsideEvents
      } = this.props;

      if (e.button === 0) {
        document.addEventListener('mouseup', outsideEvents, false);
        document.addEventListener('keydown', outsideEvents, false);
        this.isLeftBtnActive = true;
      }

      if (e.button === 2) {
        this.isRightBtnActive = true;
      }
    };

    this.onMouseUp = e => {
      const {
        outsideEvents
      } = this.props;

      if (e.button === 0) {
        document.removeEventListener('mouseup', outsideEvents, false);
        document.removeEventListener('keydown', outsideEvents, false);
        document.removeEventListener('contextmenu', this.onContextMenu, false);
        this.isLeftBtnActive = false;
      }

      if (e.button === 2) {
        this.isRightBtnActive = false;
      }
    };

    this.onKeyDown = e => {
      e.preventDefault();
      e.stopPropagation();

      if (e.code === 'Escape') {
        this.handleRestore();
        this.isLeftBtnActive = false;
      }
    };

    this.onKeyUp = e => {
      e.preventDefault();
      e.stopPropagation();
    };

    this.cropStyle = coordinate => {
      const {
        x,
        y,
        width,
        height
      } = coordinate;
      return {
        display: 'inline-block',
        position: 'absolute',
        transform: 'translate3d(0, 0, 0)',
        boxSizing: 'border-box',
        cursor: 'move',
        width,
        height,
        top: y,
        left: x,
        border: '1px solid',
        borderImageSource: 'url("data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==")',
        borderImageSlice: '1',
        borderImageRepeat: 'repeat',
        msTouchAction: 'none',
        touchAction: 'none',
        userSelect: 'none',
        background: '#262626',
        opacity: 0.5
      };
    };

    this.actionTrigger = (pointer, event, action, interactable, element, interaction) => {

      return action;
    };
  }

  componentDidMount() {
    const {
      parentImg
    } = this.props;
    interact(this.crop).draggable({
      modifiers: [interact.modifiers.restrictRect({
        restriction: 'parent'
      }), interact.modifiers.restrictSize({
        min: {
          width: 1,
          height: 1
        },
        max: {
          width: parentImg.width,
          height: parentImg.height
        }
      })],
      inertia: true
    }).resizable({
      edges: {
        left: true,
        right: true,
        bottom: true,
        top: true
      },
      modifiers: [interact.modifiers.restrict({
        restriction: 'parent'
      }), interact.modifiers.restrictSize({
        min: {
          width: 1,
          height: 1
        },
        max: {
          width: parentImg.width,
          height: parentImg.height
        }
      })],
      inertia: true
    }).on(['dragstart', 'resizestart'], this.changeStartPosition).on(['dragmove', 'dragend', 'resizemove', 'resizeend'], this.handleChange).actionChecker(this.actionTrigger);
  }

  shouldComponentUpdate(nextProps) {
    const {
      coordinate,
      index
    } = this.props;
    return !equals(nextProps.coordinate, coordinate) || nextProps.index !== index;
  }

  componentWillUnmount() {
    interact(this.crop).unset();
  }

  render() {
    const {
      coordinate,
      index,
      cropConfig: {
        hasNumberIcon = true,
        hasContent = false,
        hasDeleteButton = true
      }
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onContextMenu: this.onContextMenu,
      style: this.cropStyle(coordinate),
      ref: crop => {
        this.crop = crop;
      },
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      tabIndex: 0
    }, hasNumberIcon && /*#__PURE__*/React.createElement(CropNumberIcon, {
      number: index + 1
    }), hasDeleteButton && /*#__PURE__*/React.createElement(CropDeleteIcon, {
      onClick: this.handleDelete
    }), hasContent && /*#__PURE__*/React.createElement(CropContent, {
      content: coordinate === null || coordinate === void 0 ? void 0 : coordinate.content
    }), [styles.ordN, styles.ordNe, styles.ordNw, styles.ordS, styles.ordSe, styles.ordSw, styles.ordE, styles.ordW].map((style, id) => /*#__PURE__*/React.createElement("div", {
      className: style,
      key: id
    })));
  }

}

var styles$1 = {"multiCrops":"_MultiCrops-module__multiCrops__294bK"};

const CONSTANTS = {
  MAX_REGION_LIST_LENGTH: 1000,
  CHESS_BACKGROUND: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC',
  NOT_FOUND_IMG: 'data:image/png;base64,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'
};

const addId = map(assoc('id', v4()));
const removeId = map(omit(['id']));

const isValidPoint = (point = {}) => {
  const strictNumber = number => both(is(Number), complement(equals(NaN)))(number);

  if (point !== null && point !== void 0 && point.x && point !== null && point !== void 0 && point.y) {
    return strictNumber(point.x) && strictNumber(point.y);
  }

  return false;
};

const MultiCrops = props => {
  const {
    coordinate,
    coordinates = [],
    src = '',
    maxRegionListLength = CONSTANTS.MAX_REGION_LIST_LENGTH,
    onDraw,
    onChange,
    onComplete,
    onRestore,
    onLoad
  } = props;
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [drawingIndex, setDrawingIndex] = useState(-1);
  const [pointA, setPointA] = useState({});
  const [id, setId] = useState(v4());
  const [prevCoordinate, setPrevCoordinate] = useState({});
  const [prevCoordinates, setPrevCoordinates] = useState([]);
  const [isEscBtnTarget, setIsEscBtnTarget] = useState(false);
  const [isDragResize, setIsDragResize] = useState(false);
  const [isLeftBtnTarget, setIsLeftBtnTarget] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(false);

  const isChange = e => {
    if (['dragstart', 'resizestart'].includes(e.type)) {
      setIsDragResize(true);
    }

    if (['dragend', 'resizeend'].includes(e.type)) {
      setIsDragResize(false);
    }
  };

  const renderCrops = props => {
    const {
      coordinates
    } = props;
    const indexedMap = addIndex(map);
    return indexedMap((coor, index) => {
      return /*#__PURE__*/React.createElement(Crop, Object.assign({
        key: coor.id || index,
        index: index,
        coordinate: coor,
        isChange: e => {
          isChange(e);
        },
        parentImg: imgRef.current
      }, props));
    })(coordinates);
  };

  const getCursorPosition = e => {
    const {
      left,
      top
    } = containerRef.current.getBoundingClientRect();

    if (e.type === 'touchstart' || e.type === 'touchmove') {
      return {
        x: e.touches[0].pageX - left,
        y: e.touches[0].pageY - top
      };
    }

    if (e.type === 'mousedown' || e.type === 'mousemove') {
      return {
        x: e.clientX - left,
        y: e.clientY - top
      };
    }

    return {
      x: 0,
      y: 0
    };
  };

  const handleMouseDown = e => {
    document.removeEventListener('mouseup', outsideEvents, false);
    document.removeEventListener('keydown', outsideEvents, false);
    document.removeEventListener('contextmenu', onContextMenu, false);
    setIsDragResize(false);

    if (coordinates.length < maxRegionListLength && (e.button === 0 || e.type === 'touchstart')) {
      setIsLeftBtnTarget(true);

      if (e.target === imgRef.current || e.target === containerRef.current) {
        const {
          x,
          y
        } = getCursorPosition(e);
        setDrawingIndex(coordinates.length);
        setPointA({
          x,
          y
        });
        setId(v4());
        setIsLeftBtnTarget(true);
        setPrevCoordinate({});
        setPrevCoordinates(clone(coordinates));
        setIsEscBtnTarget(false);
      }
    }
  };

  const handleMouseMove = e => {
    if (coordinates.length <= maxRegionListLength && (e.button === 0 || e.type === 'touchmove')) {
      var _imgRef$current;

      if (isValidPoint(pointA) && e.target.offsetParent === (imgRef === null || imgRef === void 0 ? void 0 : (_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 ? void 0 : _imgRef$current.offsetParent)) {
        const pointB = getCursorPosition(e);

        if (pointA.x && pointA.y) {
          const coordinate = {
            x: Math.min(pointA.x, pointB.x),
            y: Math.min(pointA.y, pointB.y),
            width: Math.abs(pointA.x - pointB.x),
            height: Math.abs(pointA.y - pointB.y),
            id
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

    setPointA({
      x: 0,
      y: 0
    });
    setIsLeftBtnTarget(false);
    setIsEscBtnTarget(false);
  };

  const handleMouseUp = () => {
    setPointA({
      x: 0,
      y: 0
    });
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

  const outsideEvents = e => {
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

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      setIsEscBtnTarget(true);
    }
  };

  const onContextMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.multiCrops,
    onTouchStart: handleMouseDown,
    onTouchMove: handleMouseMove,
    onTouchEnd: () => {
      if (!isEscBtnTarget) {
        handleMouseUp();
        return;
      }

      restoreCrops();
    },
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onKeyDown: onKeyDown,
    onMouseUp: () => {
      if (!isEscBtnTarget) {
        handleMouseUp();
        return;
      }

      restoreCrops();
    },
    ref: container => {
      containerRef.current = container;
    },
    tabIndex: 0
  }, src && /*#__PURE__*/React.createElement("img", {
    ref: img => {
      imgRef.current = img;
    },
    width: "100%",
    src: src,
    onLoad: onLoad,
    alt: "",
    draggable: false,
    onDragStart: e => {
      e.preventDefault();
    }
  }), renderCrops(props));
};

var styles$2 = {"canvasItem":"_Canvas-module__canvasItem__3qCRo","canvasImg":"_Canvas-module__canvasImg__tP7Mz","canvasDownloadButton":"_Canvas-module__canvasDownloadButton__2-Vlk","canvasContent":"_Canvas-module__canvasContent__1ooiF"};

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(blob => {
    const previewUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = `canvas_${crop.id}.png`;
    anchor.href = URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(previewUrl);
  }, 'image/png', 1);
}

const useCanvas = (props, callback) => {
  const {
    crop = null,
    img = null
  } = props;
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  imgRef.current = img;
  useEffect(() => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    callback([canvas, ctx, image]);
  }, [crop]);
  return canvasRef;
};

const Canvas = props => {
  const {
    crop
  } = props;
  const [isHover, setIsHover] = useState(false);
  const canvasRef = useCanvas(props, ([canvas, ctx, image]) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: styles$2.canvasItem,
    onMouseEnter: () => {
      setIsHover(true);
    },
    onMouseLeave: () => {
      setIsHover(false);
    }
  }, isHover && /*#__PURE__*/React.createElement("div", {
    className: styles$2.canvasContent
  }, crop.content), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: styles$2.canvasImg
  }), isHover && /*#__PURE__*/React.createElement("div", {
    className: styles$2.canvasDownloadButton,
    onClick: () => generateDownload(canvasRef.current, crop)
  }, "Download"));
};

var styles$3 = {"canvasList":"_CanvasList-module__canvasList__1l9a0"};

const CanvasList = props => {
  const {
    canvas,
    img,
    config
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.canvasList,
    style: {
      width: (img === null || img === void 0 ? void 0 : img.width) || (config === null || config === void 0 ? void 0 : config.width),
      height: img !== null && img !== void 0 && img.height ? img.height + 10 : 0
    }
  }, canvas.map((crop, i) => /*#__PURE__*/React.createElement(Canvas, {
    key: crop.id || i,
    crop: crop,
    img: img
  })));
};

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

var styles$4 = {"regionSelector":"_RegionSelector-module__regionSelector__1HJm4","multiCrops":"_RegionSelector-module__multiCrops__3I3KZ"};

const RegionSelector = props => {
  var _imgRef$current;

  const {
    src,
    onRegionChange = null,
    regions,
    inProportions = false,
    showCanvasList = true,
    width = 460
  } = props;
  const imgRef = useRef(null);
  const [crops, setCrops] = useState([]);
  const [canvas, setCanvas] = useState([]);
  const [didMount, setDidMount] = useState(false);

  const completed = crops => {
    setCanvas(crops);

    if (onRegionChange && is(Function, onRegionChange)) {
      if (inProportions) {
        onRegionChange && onRegionChange(crops.map(crop => calcProportions(crop)));
      }

      if (!inProportions) {
        onRegionChange && onRegionChange(crops);
      }
    }
  };

  const calcPosition = crop => {
    const {
      width,
      height
    } = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    };
    const position = { ...crop,
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10)
    };
    return position;
  };

  const calcProportions = crop => {
    const {
      width,
      height
    } = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    };
    const proportions = { ...crop,
      x: parseFloat((crop.x / width).toFixed(3)),
      y: parseFloat((crop.y / height).toFixed(3)),
      height: parseFloat((crop.height / height).toFixed(3)),
      width: parseFloat((crop.width / width).toFixed(3))
    };
    return proportions;
  };

  useDidMountEffect(() => {
    if (didMount && regions) {
      if (inProportions) {
        setCrops(() => regions.map(crop => calcPosition(crop)));
      }

      if (!inProportions) {
        setCrops(regions);
      }
    }
  }, [regions]);
  useDidMountEffect(() => {
    if (!src) {
      setCrops([]);
      setCanvas([]);
      imgRef.current = null;
    }
  }, [src]);
  const onLoad = useCallback(img => {
    imgRef.current = img.target;
    setDidMount(true);

    if (inProportions && regions) {
      setCrops(() => regions.map(crop => calcPosition(crop)));
      setCanvas(() => regions.map(crop => calcPosition(crop)));
    }

    if (!inProportions && regions) {
      setCrops(regions);
      setCanvas(regions);
    }
  }, [regions, inProportions]);
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
  return /*#__PURE__*/React.createElement("div", {
    className: styles$4.regionSelector
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width
    },
    className: styles$4.multiCrops,
    onTouchEnd: () => {
      completed(crops);
    },
    onMouseUp: e => {
      if (e.button === 0) {
        completed(crops);
      }
    }
  }, /*#__PURE__*/React.createElement(MultiCrops, Object.assign({
    src: src,
    coordinates: crops,
    onChange: onChange,
    onDelete: onDelete,
    onRestore: onRestore,
    onComplete: onComplete,
    onLoad: onLoad,
    width: ((_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 ? void 0 : _imgRef$current.width) || width
  }, props))), showCanvasList && /*#__PURE__*/React.createElement(CanvasList, {
    canvas: canvas,
    img: imgRef.current,
    config: {
      width
    }
  }));
};

export { RegionSelector };
//# sourceMappingURL=index.modern.js.map
