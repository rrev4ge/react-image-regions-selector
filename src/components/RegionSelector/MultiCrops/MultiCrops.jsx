import React, { Component } from 'react'
import { both, clone, is, complement, equals, map, addIndex } from 'ramda'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
import Crop, { coordinateType } from './Crop/Crop'


const isValidPoint = (point = {}) => {
  const strictNumber = number => both(
    is(Number),
    complement(equals(NaN)),
  )(number)
  return strictNumber(point.x) && strictNumber(point.y)
}


class MultiCrops extends Component {
  drawingIndex = -1;

  pointA = {};
  id = uuidv4();

  prevCoordinate = {};
  prevCoordinates = [];

  isEscBtnTarget = false;
  isDragResize = false;
  isLeftBtnTarget = false;
  mouseLeave = false;

  isChange =(e)=>{
    if (['dragstart', 'resizestart'].includes(e.type)) {
        this.isDragResize = true;
    }

    if (['dragend', 'resizeend'].includes(e.type)) {
        this.isDragResize = false;
    }
  }

  renderCrops = (props) => {
    const indexedMap = addIndex(map)
    return indexedMap((coor, index) =>
    {
      return (<Crop
        // improve performance when delet crop in middle array
        key={coor.id || index}
        index={index}
        coordinate={coor}
        isChange={(e)=>{this.isChange(e)}}
        parentImg={this.img}
        {...props}
      />)})(props.coordinates)
  }

  

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect();
    // console.log({left, top, e})
    if (e.type === 'touchstart' || e.type === 'touchmove') {
      return {
        x: e.touches[0].pageX - left,
        y: e.touches[0].pageY - top,
      }
    }
    if (e.type === 'mousedown' || e.type === 'mousemove') {
      return {
      x: e.clientX - left,
      y: e.clientY - top,
      }
    }
    
  }

  handleMouseDown = (e) => {
    document.removeEventListener('mouseup', this.outsideEvents, false)
    document.removeEventListener('keydown', this.outsideEvents, false)
    document.removeEventListener('contextmenu', this.onContextMenu, false)
    this.isDragResize = false;
    const { coordinates, maxCrops } = this.props
    if ((coordinates.length <= maxCrops) && (e.button === 0 || e.type === 'touchstart')) {
      this.isLeftBtnTarget = true;
      if (e.target === this.img || e.target === this.container) {
        const { x, y } = this.getCursorPosition(e);
        this.drawingIndex = coordinates.length;
        this.pointA = { x, y };
        this.id = uuidv4();
        this.isLeftBtnTarget = true;
        this.prevCoordinate = {};
        this.prevCoordinates = clone(coordinates);
        this.isEscBtnTarget = false;

      }
    }
  }

  outsideEvents = (e) => {
    
    const { onRestore, coordinates, coordinate } = this.props
    if (e.button === 0) {
      
      if (this.isEscBtnTarget === false) {
        if (is(Function, onRestore)) {
          onRestore(coordinate, this.drawingIndex, coordinates)
        }
        this.handleMouseUp(e);
      }
      if(this.isEscBtnTarget === true && e.target !== this.img){
        this.restoreCrops(e);
        this.isEscBtnTarget = false;
      }
      document.removeEventListener('mouseup', this.outsideEvents, false)
      document.removeEventListener('keydown', this.outsideEvents, false)
      document.removeEventListener('contextmenu', this.onContextMenu, false)
    }
    
    if (e.code === "Escape") {
      this.isEscBtnTarget = true;
    }
    
    if (e.button === 2 ) {
      if(e.target !== this.img){
        
        this.restoreCrops(e);
      }
    }
    return false;
  }

  handleMouseMove = (e) => {

    const { props:{onDraw, onChange, coordinates, maxCrops}, pointA } = this
    if ((coordinates.length <= maxCrops) && (e.button === 0 || e.type === 'touchmove' )) {
      if (isValidPoint(pointA) && (e.target.offsetParent===this.img.offsetParent)) {
        const pointB = this.getCursorPosition(e)
        // get the drawing coordinate
        const coordinate = {
          x: Math.min(pointA.x, pointB.x),
          y: Math.min(pointA.y, pointB.y),
          width: Math.abs(pointA.x - pointB.x),
          height: Math.abs(pointA.y - pointB.y),
          id: this.id,
        };
        const nextCoordinates = clone(coordinates)
        nextCoordinates[this.drawingIndex] = coordinate
        if (is(Function, onDraw)) {
          onDraw(coordinate, this.drawingIndex, nextCoordinates)
        }
        if (is(Function, onChange)) {
          onChange(coordinate, this.drawingIndex, nextCoordinates)
        }

      }
    }
  }

  restoreCrops = (e) => {
    
    const { onRestore } = this.props

      
    if (is(Function, onRestore)) {
      onRestore(this.prevCoordinate, this.drawingIndex-1, this.prevCoordinates)
    }

    this.pointA = {};
    this.isLeftBtnTarget = false;
    this.isEscBtnTarget = false;
  }


  handleMouseUp = (e) => {

    this.pointA = {};
    this.isLeftBtnTarget = false;
    this.mouseLeave = false;
    this.isEscBtnTarget = false;
    
  }

  handleMouseLeave = (e) => {
    if (this.isDragResize === false && this.isLeftBtnTarget === true) {
      document.addEventListener('contextmenu', this.onContextMenu, false)
      document.addEventListener('mouseup', this.outsideEvents, false)
      document.addEventListener('keydown', this.outsideEvents, false)
    }
    this.mouseLeave = true;
  } 

  handleMouseEnter = (e) => {
      document.removeEventListener('mouseup', this.outsideEvents, false)
      document.removeEventListener('keydown', this.outsideEvents, false)
      document.removeEventListener('contextmenu', this.onContextMenu, false)
      this.mouseLeave = false;
  } 


   onKeyDown = (e) => {
   if (e.code === "Escape") {
      this.isEscBtnTarget = true;
    } 
  }

  onContextMenu = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    return false;
  }


  render() {
    const {
      src, onLoad,
    } = this.props
    return (
      <div
          style={{
            border: "none",
            boxSizing: "content-box",
            position: 'relative',
            msTouchAction: 'none',
            touchAction: 'none',
            userSelect: 'none',
          }}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={(e)=>{!this.isEscBtnTarget ? this.handleMouseUp(e) : this.restoreCrops(e)}}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onKeyDown={this.onKeyDown}
        onMouseUp={(e)=>{!this.isEscBtnTarget ? this.handleMouseUp(e) : this.restoreCrops(e)}}
        ref={container => this.container = container}
        tabIndex="0"
      >
        <img
          ref={img => this.img = img}
          width={"100%"}
          src={src}
          onLoad={onLoad}
          alt=""
          draggable={false}
          onDragStart={(e) => { e.preventDefault() }}
        />
        {this.renderCrops(this.props)}
      </div>
    )
  }
}

const {
  string, arrayOf, number, func, bool,
} = PropTypes

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
}

MultiCrops.defaultProps = {
  coordinates: [],
  src: '',
  cropContent: false,
  deleteIcon: true,
  numberIcon: true,
  maxCrops: Infinity,
}

export { removeid, addid } from './utils'
export default MultiCrops

