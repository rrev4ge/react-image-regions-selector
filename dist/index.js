function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ramda = require('ramda');
var uuid = require('uuid');
var interact = _interopDefault(require('interactjs'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

var styles = {"rmcIconContainer":"_17jGb","rmcRemove":"_2D0hp","numberIcon":"_3R7bI","cropContent":"_21A1G","ordN":"_19ntT","ordNe":"_1Zl9b","ordNw":"_3C514","ordS":"_2tvc1","ordSe":"_1sWTP","ordSw":"_2HC6Y","ordE":"_3L_y_","ordW":"_K3lk6","ord-n":"_36aZb","ord-e":"_MMQaN","ord-s":"_qAshv","ord-w":"_2RsOK"};

var CropDeleteIcon = function CropDeleteIcon(props) {
  return /*#__PURE__*/React__default.createElement("div", _extends({
    className: styles.rmcIconContainer
  }, props), /*#__PURE__*/React__default.createElement("div", {
    className: styles.rmcRemove
  }));
};
var CropNumberIcon = function CropNumberIcon(_ref) {
  var _ref$number = _ref.number,
      number = _ref$number === void 0 ? '' : _ref$number;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.numberIcon
  }, number);
};
var CropContent = function CropContent(_ref2) {
  var content = _ref2.content;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.cropContent
  }, content);
};

var Crop = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Crop, _Component);

  function Crop() {
    var _this;

    _this = _Component.apply(this, arguments) || this;
    _this.prevCoordinate = null;
    _this.prevCoordinates = [];
    _this.isLeftBtnActive = false;
    _this.isRightBtnActive = false;
    _this.crop = null;

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          coordinate = _this$props.coordinate,
          _this$props$coordinat = _this$props.coordinate,
          x = _this$props$coordinat.x,
          y = _this$props$coordinat.y,
          coordinates = _this$props.coordinates,
          onResize = _this$props.onResize,
          onDrag = _this$props.onDrag,
          onChange = _this$props.onChange,
          onComplete = _this$props.onComplete,
          isChange = _this$props.isChange,
          parentImg = _this$props.parentImg;
      var dx = e.dx,
          dy = e.dy;
      var nextCoordinate = {};

      if (e.type === 'resizemove') {
        var _e$rect = e.rect,
            width = _e$rect.width,
            height = _e$rect.height,
            _e$deltaRect = e.deltaRect,
            left = _e$deltaRect.left,
            top = _e$deltaRect.top,
            right = _e$deltaRect.right,
            bottom = _e$deltaRect.bottom;

        var resizeCoordinate = _extends({}, (x + left >= 0 && x + left + width < parentImg.width || x + left >= 0 && left < 0) && {
          x: x + left
        }, (y + top >= 0 && y + top + height < parentImg.height || y + top >= 0 && top < 0) && {
          y: y + top
        });

        var resize = {
          width: resizeCoordinate.x + width <= parentImg.width ? x + left <= 0 && right === 0 ? coordinate.width : width : coordinate.width,
          height: resizeCoordinate.y + height <= parentImg.height ? y + top <= 0 && bottom === 0 ? coordinate.height : height : coordinate.height
        };
        nextCoordinate = _extends({}, coordinate, resizeCoordinate, resize);
      }

      if (e.type === 'dragmove') {
        nextCoordinate = _extends({}, coordinate, {
          x: x + dx,
          y: y + dy
        });
      }

      var nextCoordinates = ramda.update(index, nextCoordinate)(coordinates);

      if (onResize && ramda.is(Function, onResize) && e.type === 'resizemove') {
        onResize(nextCoordinate, index, nextCoordinates);
      }

      if (ramda.is(Function, onChange) && ['dragmove', 'resizemove'].includes(e.type)) {
        onChange(nextCoordinate, index, nextCoordinates);
      }

      if (onDrag && ramda.is(Function, onDrag) && e.type === 'dragmove') {
        onDrag(nextCoordinate, index, nextCoordinates);
      }

      if (['dragend', 'resizeend'].includes(e.type)) {
        onComplete(coordinate, index, coordinates);
        isChange(e);
        document.removeEventListener('contextmenu', _this.onContextMenu, false);
      }
    };

    _this.changeStartPosition = function (e) {
      var _this$props2 = _this.props,
          index = _this$props2.index,
          coordinate = _this$props2.coordinate,
          coordinates = _this$props2.coordinates,
          isChange = _this$props2.isChange;

      if (['dragstart', 'resizestart'].includes(e.type)) {
        document.addEventListener('contextmenu', _this.onContextMenu, false);
        _this.prevCoordinate = _extends({}, coordinate);
        _this.prevCoordinates = [].concat(coordinates);
        _this.prevCoordinates = ramda.update(index, _this.prevCoordinate, coordinates);
        isChange(e);
      }
    };

    _this.handleRestore = function () {
      var _this$props3 = _this.props,
          index = _this$props3.index,
          onRestore = _this$props3.onRestore;

      if (ramda.is(Function, onRestore)) {
        onRestore(_this.prevCoordinate, index, _this.prevCoordinates);
      }
    };

    _this.handleDelete = function () {
      var _this$props4 = _this.props,
          index = _this$props4.index,
          coordinate = _this$props4.coordinate,
          onDelete = _this$props4.onDelete,
          coordinates = _this$props4.coordinates;
      var nextCoordinates = ramda.remove(index, 1)(coordinates);

      if (ramda.is(Function, onDelete)) {
        onDelete(coordinate, index, nextCoordinates);
      }
    };

    _this.onContextMenu = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.button === 2) {
        if (_this.isLeftBtnActive === false) {
          _this.handleDelete();
        }

        if (_this.isLeftBtnActive === true) {
          _this.handleRestore();

          _this.isLeftBtnActive = false;
        }
      }

      return false;
    };

    _this.onMouseDown = function (e) {
      var outsideEvents = _this.props.outsideEvents;

      if (e.button === 0) {
        document.addEventListener('mouseup', outsideEvents, false);
        document.addEventListener('keydown', outsideEvents, false);
        _this.isLeftBtnActive = true;
      }

      if (e.button === 2) {
        _this.isRightBtnActive = true;
      }
    };

    _this.onMouseUp = function (e) {
      var outsideEvents = _this.props.outsideEvents;

      if (e.button === 0) {
        document.removeEventListener('mouseup', outsideEvents, false);
        document.removeEventListener('keydown', outsideEvents, false);
        document.removeEventListener('contextmenu', _this.onContextMenu, false);
        _this.isLeftBtnActive = false;
      }

      if (e.button === 2) {
        _this.isRightBtnActive = false;
      }
    };

    _this.onKeyDown = function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.code === 'Escape') {
        _this.handleRestore();

        _this.isLeftBtnActive = false;
      }
    };

    _this.onKeyUp = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    _this.cropStyle = function (coordinate) {
      var x = coordinate.x,
          y = coordinate.y,
          width = coordinate.width,
          height = coordinate.height;
      return {
        display: 'inline-block',
        position: 'absolute',
        transform: 'translate3d(0, 0, 0)',
        boxSizing: 'border-box',
        cursor: 'move',
        width: width,
        height: height,
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

    _this.actionTrigger = function (pointer, event, action, interactable, element, interaction) {

      return action;
    };

    return _this;
  }

  var _proto = Crop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var parentImg = this.props.parentImg;
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
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props5 = this.props,
        coordinate = _this$props5.coordinate,
        index = _this$props5.index;
    return !ramda.equals(nextProps.coordinate, coordinate) || nextProps.index !== index;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    interact(this.crop).unset();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props6 = this.props,
        coordinate = _this$props6.coordinate,
        index = _this$props6.index,
        _this$props6$cropConf = _this$props6.cropConfig,
        _this$props6$cropConf2 = _this$props6$cropConf.hasNumberIcon,
        hasNumberIcon = _this$props6$cropConf2 === void 0 ? true : _this$props6$cropConf2,
        _this$props6$cropConf3 = _this$props6$cropConf.hasContent,
        hasContent = _this$props6$cropConf3 === void 0 ? false : _this$props6$cropConf3,
        _this$props6$cropConf4 = _this$props6$cropConf.hasDeleteButton,
        hasDeleteButton = _this$props6$cropConf4 === void 0 ? true : _this$props6$cropConf4;
    return /*#__PURE__*/React__default.createElement("div", {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onContextMenu: this.onContextMenu,
      style: this.cropStyle(coordinate),
      ref: function ref(crop) {
        _this2.crop = crop;
      },
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      tabIndex: 0
    }, hasNumberIcon && /*#__PURE__*/React__default.createElement(CropNumberIcon, {
      number: index + 1
    }), hasDeleteButton && /*#__PURE__*/React__default.createElement(CropDeleteIcon, {
      onClick: this.handleDelete
    }), hasContent && /*#__PURE__*/React__default.createElement(CropContent, {
      content: coordinate === null || coordinate === void 0 ? void 0 : coordinate.content
    }), [styles.ordN, styles.ordNe, styles.ordNw, styles.ordS, styles.ordSe, styles.ordSw, styles.ordE, styles.ordW].map(function (style, id) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: style,
        key: id
      });
    }));
  };

  return Crop;
}(React.Component);

var styles$1 = {"multiCrops":"_294bK"};

var CONSTANTS = {
  MAX_REGION_LIST_LENGTH: 1000,
  CHESS_BACKGROUND: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC',
  NOT_FOUND_IMG: 'data:image/png;base64,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'
};

var addId = ramda.map(ramda.assoc('id', uuid.v4()));
var removeId = ramda.map(ramda.omit(['id']));

var isValidPoint = function isValidPoint(point) {
  var _point, _point2;

  if (point === void 0) {
    point = {};
  }

  var strictNumber = function strictNumber(number) {
    return ramda.both(ramda.is(Number), ramda.complement(ramda.equals(NaN)))(number);
  };

  if ((_point = point) !== null && _point !== void 0 && _point.x && (_point2 = point) !== null && _point2 !== void 0 && _point2.y) {
    return strictNumber(point.x) && strictNumber(point.y);
  }

  return false;
};

var MultiCrops = function MultiCrops(props) {
  var coordinate = props.coordinate,
      _props$coordinates = props.coordinates,
      coordinates = _props$coordinates === void 0 ? [] : _props$coordinates,
      _props$src = props.src,
      src = _props$src === void 0 ? '' : _props$src,
      _props$maxRegionListL = props.maxRegionListLength,
      maxRegionListLength = _props$maxRegionListL === void 0 ? CONSTANTS.MAX_REGION_LIST_LENGTH : _props$maxRegionListL,
      onDraw = props.onDraw,
      onChange = props.onChange,
      onRestore = props.onRestore,
      onLoad = props.onLoad;
  var imgRef = React.useRef(null);
  var containerRef = React.useRef(null);

  var _useState = React.useState(-1),
      drawingIndex = _useState[0],
      setDrawingIndex = _useState[1];

  var _useState2 = React.useState({}),
      pointA = _useState2[0],
      setPointA = _useState2[1];

  var _useState3 = React.useState(uuid.v4()),
      id = _useState3[0],
      setId = _useState3[1];

  var _useState4 = React.useState({}),
      prevCoordinate = _useState4[0],
      setPrevCoordinate = _useState4[1];

  var _useState5 = React.useState([]),
      prevCoordinates = _useState5[0],
      setPrevCoordinates = _useState5[1];

  var _useState6 = React.useState(false),
      isEscBtnTarget = _useState6[0],
      setIsEscBtnTarget = _useState6[1];

  var _useState7 = React.useState(false),
      isDragResize = _useState7[0],
      setIsDragResize = _useState7[1];

  var _useState8 = React.useState(false),
      isLeftBtnTarget = _useState8[0],
      setIsLeftBtnTarget = _useState8[1];

  var _useState9 = React.useState(false),
      setMouseLeave = _useState9[1];

  var _isChange = function isChange(e) {
    if (['dragstart', 'resizestart'].includes(e.type)) {
      setIsDragResize(true);
    }

    if (['dragend', 'resizeend'].includes(e.type)) {
      setIsDragResize(false);
    }
  };

  var renderCrops = function renderCrops(props) {
    var coordinates = props.coordinates;
    var indexedMap = ramda.addIndex(ramda.map);
    return indexedMap(function (coor, index) {
      return /*#__PURE__*/React__default.createElement(Crop, _extends({
        key: coor.id || index,
        index: index,
        coordinate: coor,
        isChange: function isChange(e) {
          _isChange(e);
        },
        parentImg: imgRef.current
      }, props));
    })(coordinates);
  };

  var getCursorPosition = function getCursorPosition(e) {
    var _containerRef$current = containerRef.current.getBoundingClientRect(),
        left = _containerRef$current.left,
        top = _containerRef$current.top;

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

  var handleMouseDown = function handleMouseDown(e) {
    document.removeEventListener('mouseup', outsideEvents, false);
    document.removeEventListener('keydown', outsideEvents, false);
    document.removeEventListener('contextmenu', onContextMenu, false);
    setIsDragResize(false);

    if (coordinates.length < maxRegionListLength && (e.button === 0 || e.type === 'touchstart')) {
      setIsLeftBtnTarget(true);

      if (e.target === imgRef.current || e.target === containerRef.current) {
        var _getCursorPosition = getCursorPosition(e),
            x = _getCursorPosition.x,
            y = _getCursorPosition.y;

        setDrawingIndex(coordinates.length);
        setPointA({
          x: x,
          y: y
        });
        setId(uuid.v4());
        setIsLeftBtnTarget(true);
        setPrevCoordinate({});
        setPrevCoordinates(ramda.clone(coordinates));
        setIsEscBtnTarget(false);
      }
    }
  };

  var handleMouseMove = function handleMouseMove(e) {
    if (coordinates.length <= maxRegionListLength && (e.button === 0 || e.type === 'touchmove')) {
      var _imgRef$current;

      if (isValidPoint(pointA) && e.target.offsetParent === (imgRef === null || imgRef === void 0 ? void 0 : (_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 ? void 0 : _imgRef$current.offsetParent)) {
        var pointB = getCursorPosition(e);

        if (pointA.x && pointA.y) {
          var _coordinate = {
            x: Math.min(pointA.x, pointB.x),
            y: Math.min(pointA.y, pointB.y),
            width: Math.abs(pointA.x - pointB.x),
            height: Math.abs(pointA.y - pointB.y),
            id: id
          };
          var nextCoordinates = ramda.clone(coordinates);
          nextCoordinates[drawingIndex] = _coordinate;

          if (onDraw && ramda.is(Function, onDraw)) {
            onDraw(_coordinate, drawingIndex, nextCoordinates);
          }

          if (ramda.is(Function, onChange)) {
            onChange(_coordinate, drawingIndex, nextCoordinates);
          }
        }
      }
    }
  };

  var restoreCrops = function restoreCrops() {
    if (ramda.is(Function, onRestore)) {
      onRestore(prevCoordinate, drawingIndex - 1, prevCoordinates);
    }

    setPointA({
      x: 0,
      y: 0
    });
    setIsLeftBtnTarget(false);
    setIsEscBtnTarget(false);
  };

  var handleMouseUp = function handleMouseUp() {
    setPointA({
      x: 0,
      y: 0
    });
    setIsLeftBtnTarget(false);
    setMouseLeave(false);
    setIsEscBtnTarget(false);
  };

  var handleMouseLeave = function handleMouseLeave() {
    if (isDragResize === false && isLeftBtnTarget === true) {
      document.addEventListener('contextmenu', onContextMenu, false);
      document.addEventListener('mouseup', outsideEvents, false);
      document.addEventListener('keydown', outsideEvents, false);
    }

    setMouseLeave(true);
  };

  var handleMouseEnter = function handleMouseEnter() {
    document.removeEventListener('mouseup', outsideEvents, false);
    document.removeEventListener('keydown', outsideEvents, false);
    document.removeEventListener('contextmenu', onContextMenu, false);
    setMouseLeave(false);
  };

  var outsideEvents = function outsideEvents(e) {
    if (e.button === 0) {
      if (isEscBtnTarget === false) {
        if (ramda.is(Function, onRestore)) {
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

  var onKeyDown = function onKeyDown(e) {
    if (e.code === 'Escape') {
      setIsEscBtnTarget(true);
    }
  };

  var onContextMenu = function onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$1.multiCrops,
    onTouchStart: handleMouseDown,
    onTouchMove: handleMouseMove,
    onTouchEnd: function onTouchEnd() {
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
    onMouseUp: function onMouseUp() {
      if (!isEscBtnTarget) {
        handleMouseUp();
        return;
      }

      restoreCrops();
    },
    ref: function ref(container) {
      containerRef.current = container;
    },
    tabIndex: 0
  }, src && /*#__PURE__*/React__default.createElement("img", {
    ref: function ref(img) {
      imgRef.current = img;
    },
    width: "100%",
    src: src,
    onLoad: onLoad,
    alt: "",
    draggable: false,
    onDragStart: function onDragStart(e) {
      e.preventDefault();
    }
  }), renderCrops(props));
};

var styles$2 = {"canvasItem":"_3qCRo","canvasImg":"_tP7Mz","canvasDownloadButton":"_2-Vlk","canvasContent":"_1ooiF"};

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(function (blob) {
    var previewUrl = window.URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.download = "canvas_" + crop.id + ".png";
    anchor.href = URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(previewUrl);
  }, 'image/png', 1);
}

var useCanvas = function useCanvas(props, callback) {
  var _props$crop = props.crop,
      crop = _props$crop === void 0 ? null : _props$crop,
      _props$img = props.img,
      img = _props$img === void 0 ? null : _props$img;
  var canvasRef = React.useRef(null);
  var imgRef = React.useRef(null);
  imgRef.current = img;
  React.useEffect(function () {
    var image = imgRef.current;
    var canvas = canvasRef.current;
    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    callback([canvas, ctx, image]);
  }, [crop]);
  return canvasRef;
};

var Canvas = function Canvas(props) {
  var crop = props.crop;

  var _useState = React.useState(false),
      isHover = _useState[0],
      setIsHover = _useState[1];

  var canvasRef = useCanvas(props, function (_ref) {
    var canvas = _ref[0],
        ctx = _ref[1],
        image = _ref[2];
    var scaleX = image.naturalWidth / image.width;
    var scaleY = image.naturalHeight / image.height;
    var pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasItem,
    onMouseEnter: function onMouseEnter() {
      setIsHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      setIsHover(false);
    }
  }, isHover && /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasContent
  }, crop.content), /*#__PURE__*/React__default.createElement("canvas", {
    ref: canvasRef,
    className: styles$2.canvasImg
  }), isHover && /*#__PURE__*/React__default.createElement("div", {
    className: styles$2.canvasDownloadButton,
    onClick: function onClick() {
      return generateDownload(canvasRef.current, crop);
    }
  }, "Download"));
};

var styles$3 = {"canvasList":"_1l9a0"};

var CanvasList = function CanvasList(props) {
  var canvas = props.canvas,
      img = props.img,
      config = props.config;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.canvasList,
    style: {
      width: (img === null || img === void 0 ? void 0 : img.width) || (config === null || config === void 0 ? void 0 : config.width),
      height: img !== null && img !== void 0 && img.height ? img.height + 10 : 0
    }
  }, canvas.map(function (crop, i) {
    return /*#__PURE__*/React__default.createElement(Canvas, {
      key: crop.id || i,
      crop: crop,
      img: img
    });
  }));
};

var useDidMountEffect = function useDidMountEffect(func, deps) {
  var didMount = React.useRef(false);
  React.useEffect(function () {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

var styles$4 = {"regionSelector":"_1HJm4","multiCrops":"_3I3KZ"};

var RegionSelector = function RegionSelector(props) {
  var _imgRef$current;

  var src = props.src,
      _props$onRegionChange = props.onRegionChange,
      onRegionChange = _props$onRegionChange === void 0 ? null : _props$onRegionChange,
      regions = props.regions,
      _props$inProportions = props.inProportions,
      inProportions = _props$inProportions === void 0 ? false : _props$inProportions,
      _props$showCanvasList = props.showCanvasList,
      showCanvasList = _props$showCanvasList === void 0 ? true : _props$showCanvasList,
      _props$width = props.width,
      width = _props$width === void 0 ? 460 : _props$width;
  var imgRef = React.useRef(null);

  var _useState = React.useState([]),
      crops = _useState[0],
      setCrops = _useState[1];

  var _useState2 = React.useState([]),
      canvas = _useState2[0],
      setCanvas = _useState2[1];

  var _useState3 = React.useState(false),
      didMount = _useState3[0],
      setDidMount = _useState3[1];

  var completed = function completed(crops) {
    setCanvas(crops);

    if (onRegionChange && ramda.is(Function, onRegionChange)) {
      if (inProportions) {
        onRegionChange && onRegionChange(crops.map(function (crop) {
          return calcProportions(crop);
        }));
      }

      if (!inProportions) {
        onRegionChange && onRegionChange(crops);
      }
    }
  };

  var calcPosition = function calcPosition(crop) {
    var _ref = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    },
        width = _ref.width,
        height = _ref.height;

    var position = _extends({}, crop, {
      x: parseInt((width * crop.x).toFixed(0), 10),
      y: parseInt((height * crop.y).toFixed(0), 10),
      height: parseInt((height * crop.height).toFixed(0), 10),
      width: parseInt((width * crop.width).toFixed(0), 10)
    });

    return position;
  };

  var calcProportions = function calcProportions(crop) {
    var _ref2 = typeof (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) !== 'undefined' && (imgRef === null || imgRef === void 0 ? void 0 : imgRef.current) || {
      width: 0,
      height: 0
    },
        width = _ref2.width,
        height = _ref2.height;

    var proportions = _extends({}, crop, {
      x: parseFloat((crop.x / width).toFixed(3)),
      y: parseFloat((crop.y / height).toFixed(3)),
      height: parseFloat((crop.height / height).toFixed(3)),
      width: parseFloat((crop.width / width).toFixed(3))
    });

    return proportions;
  };

  useDidMountEffect(function () {
    if (didMount && regions) {
      if (inProportions) {
        setCrops(function () {
          return regions.map(function (crop) {
            return calcPosition(crop);
          });
        });
      }

      if (!inProportions) {
        setCrops(regions);
      }
    }
  }, [regions]);
  useDidMountEffect(function () {
    if (!src) {
      setCrops([]);
      setCanvas([]);
      imgRef.current = null;
    }
  }, [src]);
  var onLoad = React.useCallback(function (img) {
    imgRef.current = img.target;
    setDidMount(true);

    if (inProportions && regions) {
      setCrops(function () {
        return regions.map(function (crop) {
          return calcPosition(crop);
        });
      });
      setCanvas(function () {
        return regions.map(function (crop) {
          return calcPosition(crop);
        });
      });
    }

    if (!inProportions && regions) {
      setCrops(regions);
      setCanvas(regions);
    }
  }, [regions, inProportions]);
  var onChange = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
  }, []);
  var onDelete = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  var onRestore = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  var onComplete = React.useCallback(function (crop, index, crops) {
    setCrops(crops);
    completed(crops);
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$4.regionSelector
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: width
    },
    className: styles$4.multiCrops,
    onTouchEnd: function onTouchEnd() {
      completed(crops);
    },
    onMouseUp: function onMouseUp(e) {
      if (e.button === 0) {
        completed(crops);
      }
    }
  }, /*#__PURE__*/React__default.createElement(MultiCrops, _extends({
    src: src,
    coordinates: crops,
    onChange: onChange,
    onDelete: onDelete,
    onRestore: onRestore,
    onComplete: onComplete,
    onLoad: onLoad,
    width: ((_imgRef$current = imgRef.current) === null || _imgRef$current === void 0 ? void 0 : _imgRef$current.width) || width
  }, props))), showCanvasList && /*#__PURE__*/React__default.createElement(CanvasList, {
    canvas: canvas,
    img: imgRef.current,
    config: {
      width: width
    }
  }));
};

exports.RegionSelector = RegionSelector;
//# sourceMappingURL=index.js.map
