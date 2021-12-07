import React, { useRef, useState } from "react";
import { addIndex, both, clone, complement, equals, is, map } from "ramda";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Crop, { coordinateType } from "./Crop/Crop";


const isValidPoint = (point = {}) => {
    const strictNumber = number => both(
        is(Number),
        complement(equals(NaN)),
    )(number);
    return strictNumber(point.x) && strictNumber(point.y);
};


const MultiCrops = (props) => {

    const imgRef = useRef(null);
    const containerRef = useRef(null);

    const [drawingIndex, setDrawingIndex] = useState(-1);
    const [pointA, setPointA] = useState({});

    const [id, setId] = useState(uuidv4());

    const [prevCoordinate, setPrevCoordinate] = useState({});
    const [prevCoordinates, setPrevCoordinates] = useState([]);


    const [isEscBtnTarget, setIsEscBtnTarget] = useState(false);
    const [isDragResize, setIsDragResize] = useState(false);
    const [isLeftBtnTarget, setIsLeftBtnTarget] = useState(false);
    const [mouseLeave, setMouseLeave] = useState(false);


    const isChange = (e) => {
        if (["dragstart", "resizestart"].includes(e.type)) {
            setIsDragResize(true);
        }
        if (["dragend", "resizeend"].includes(e.type)) {
            setIsDragResize(false);
        }
    };

    const renderCrops = (props) => {
        const indexedMap = addIndex(map);
        return indexedMap((coor, index) => {
            return (<Crop
                // improve performance when delet crop in middle array
                key={coor.id || index}
                index={index}
                coordinate={coor}
                isChange={(e) => {
                    isChange(e);
                }}
                parentImg={imgRef.current}
                {...props}
            />);
        })(props.coordinates);
    };


    const getCursorPosition = (e) => {
        const {left, top} = containerRef.current.getBoundingClientRect();
        if (e.type === "touchstart" || e.type === "touchmove") {
            return {
                x: e.touches[0].pageX - left,
                y: e.touches[0].pageY - top,
            };
        }
        if (e.type === "mousedown" || e.type === "mousemove") {
            return {
                x: e.clientX - left,
                y: e.clientY - top,
            };
        }

    };

    const handleMouseDown = (e) => {
        document.removeEventListener("mouseup", outsideEvents, false);
        document.removeEventListener("keydown", outsideEvents, false);
        document.removeEventListener("contextmenu", onContextMenu, false);
        setIsDragResize(false);
        const {coordinates, maxCrops} = props;
        if ((coordinates.length <= maxCrops) && (e.button === 0 || e.type === "touchstart")) {
            setIsLeftBtnTarget( true);
            if (e.target === imgRef.current || e.target === containerRef.current) {
                const {x, y} = getCursorPosition(e);
                setDrawingIndex(coordinates.length);
                setPointA({x, y});
                setId(uuidv4());
                setIsLeftBtnTarget(true);
                setPrevCoordinate({});
                setPrevCoordinates(clone(coordinates));
                setIsEscBtnTarget(false);
            }
        }
    };

    const outsideEvents = (e) => {

        const {onRestore, coordinates, coordinate} = props;
        if (e.button === 0) {

            if (isEscBtnTarget === false) {
                if (is(Function, onRestore)) {
                    onRestore(coordinate, drawingIndex, coordinates);
                }
                handleMouseUp(e);
            }
            if (isEscBtnTarget === true && e.target !== imgRef.current) {
                restoreCrops(e);
                setIsEscBtnTarget(false);
            }
            document.removeEventListener("mouseup", outsideEvents, false);
            document.removeEventListener("keydown", outsideEvents, false);
            document.removeEventListener("contextmenu", onContextMenu, false);
        }

        if (e.code === "Escape") {
            setIsEscBtnTarget(true);
        }

        if (e.button === 2) {
            if (e.target !== imgRef.current) {
                restoreCrops(e);
            }
        }
        return false;
    };

    const handleMouseMove = (e) => {

        const {onDraw, onChange, coordinates, maxCrops } = props;
        if ((coordinates.length <= maxCrops) && (e.button === 0 || e.type === "touchmove")) {
            if (isValidPoint(pointA) && (e.target.offsetParent === imgRef.current.offsetParent)) {
                const pointB = getCursorPosition(e);
                // get the drawing coordinate
                const coordinate = {
                    x: Math.min(pointA.x, pointB.x),
                    y: Math.min(pointA.y, pointB.y),
                    width: Math.abs(pointA.x - pointB.x),
                    height: Math.abs(pointA.y - pointB.y),
                    id: id,
                };
                const nextCoordinates = clone(coordinates);
                nextCoordinates[drawingIndex] = coordinate;
                if (is(Function, onDraw)) {
                    onDraw(coordinate, drawingIndex, nextCoordinates);
                }
                if (is(Function, onChange)) {
                    onChange(coordinate, drawingIndex, nextCoordinates);
                }

            }
        }
    };

    const restoreCrops = () => {

        const {onRestore} = props;

        if (is(Function, onRestore)) {
            onRestore(prevCoordinate, drawingIndex - 1, prevCoordinates);
        }

        setPointA({});
        setIsLeftBtnTarget(false);
        setIsEscBtnTarget(false);
    };


    const handleMouseUp = () => {
        setPointA({});
        setIsLeftBtnTarget(false);
        setMouseLeave(false);
        setIsEscBtnTarget(false);

    };

    const handleMouseLeave = () => {
        if (isDragResize === false && isLeftBtnTarget === true) {
            document.addEventListener("contextmenu", onContextMenu, false);
            document.addEventListener("mouseup", outsideEvents, false);
            document.addEventListener("keydown", outsideEvents, false);
        }
        setMouseLeave(true);
    };

    const handleMouseEnter = () => {
        document.removeEventListener("mouseup", outsideEvents, false);
        document.removeEventListener("keydown", outsideEvents, false);
        document.removeEventListener("contextmenu", onContextMenu, false);
        setMouseLeave(false);
    };


    const onKeyDown = (e) => {
        if (e.code === "Escape") {
            setIsEscBtnTarget(true);
        }
    };

    const onContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    const {src, onLoad,} = props;
    return (
        <div
            style={{
                border: "none",
                boxSizing: "content-box",
                position: "relative",
                msTouchAction: "none",
                touchAction: "none",
                userSelect: "none",
            }}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={(e) => {
                !isEscBtnTarget ? handleMouseUp(e) : restoreCrops(e);
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onKeyDown={onKeyDown}
            onMouseUp={(e) => {
                !isEscBtnTarget ? handleMouseUp(e) : restoreCrops(e);
            }}
            ref={container => containerRef.current = container}
            tabIndex="0"
        >
            <img
                ref={img => imgRef.current = img}
                width={"100%"}
                height={props.width / props.aspectRatio}
                src={src}
                onLoad={onLoad}
                alt=""
                draggable={false}
                onDragStart={(e) => {
                    e.preventDefault();
                }}
            />
            {renderCrops(props)}
        </div>
    );
};

const {
    string, arrayOf, number, func, bool,
} = PropTypes;

MultiCrops.propTypes = {
    coordinates: arrayOf(coordinateType),
    src: string,
    cropContent: bool,
    deleteIcon: bool,
    numberIcon: bool,
    width: number, // eslint-disable-line
    height: number, // eslint-disable-line
    onDraw: func, // eslint-disable-line
    onChange: func, // eslint-disable-line
    onComplete: func, // eslint-disable-line
    onRestore: func, // eslint-disable-line
    onLoad: func, // eslint-disable-line
    inProportions: bool,
    maxCrops: number,
};

MultiCrops.defaultProps = {
    coordinates: [],
    src: "",
    cropContent: false,
    deleteIcon: true,
    numberIcon: true,
    maxCrops: Infinity,
};

export { removeid, addid } from "./utils";
export default MultiCrops;

