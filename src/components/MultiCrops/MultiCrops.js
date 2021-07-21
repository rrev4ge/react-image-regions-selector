import React, { Component } from 'react'
import { both, clone, is, complement, equals, map, addIndex } from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Crop, { coordinateType } from './Crop/Crop'


const isValidPoint = (point = {}) => {
  const strictNumber = number => both(
    is(Number),
    complement(equals(NaN)),
  )(number)
  return strictNumber(point.x) && strictNumber(point.y)
}


class MultiCrops extends Component {
  drawingIndex = -1

  pointA = {}

  id = shortid.generate()

  prevCoordinate = {};
  prevCoordinates = [];

  mouseEnter=true;
  isEscBtnTarget = false;
  isDragResize = false;
  isLeftBtnTarget = false;

  isChange =(e)=>{
    if (['dragstart', 'resizestart'].includes(e.type)) {
        this.isDragResize = true;
        console.log({E:e.type, D:this.isDragResize});
    }
    if (['dragend', 'resizeend'].includes(e.type)) {
        this.isDragResize = false;
        console.log({E:e.type, D:this.isDragResize});
    }
  }

  renderCrops = (props) => {
    const indexedMap = addIndex(map)
    return indexedMap((coor, index) =>
      (<Crop
        // improve performance when delet crop in middle array
        key={coor.id || index}
        index={index}
        coordinate={coor}
        isChange={(e)=>{this.isChange(e)}}
        {...props}
      />))(props.coordinates)
  }

  

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect()
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
    const { coordinates } = this.props
    this.isDragResize = false;
    if (e.button === 0 || e.type === 'touchstart') {
      this.isLeftBtnTarget = true;
      console.log(this.isDragResize);
      if (e.target === this.img || e.target === this.container) {
        const { x, y } = this.getCursorPosition(e);
        this.drawingIndex = coordinates.length;
        this.pointA = { x, y };
        this.id = shortid.generate();
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
      if (this.isEscBtnTarget !== true) {
        this.isEscBtnTarget = false;
        if (is(Function, onRestore)) {
          onRestore(coordinate, this.drawingIndex, coordinates)
        }
        this.handleMouseUp(e);
      }
      if(this.isEscBtnTarget === true && e.target !== this.container){
        this.restoreCrops(e);
        this.isEscBtnTarget = false;
      }
      document.removeEventListener('mouseup', this.outsideEvents, true)
      document.removeEventListener('keyup', this.outsideEvents, true)
      document.removeEventListener('contextmenu', this.outsideEvents, true)
    }
    
    if (e.code === "Escape") {
      
      this.isEscBtnTarget = true;
     
    }
    
    if (e.button === 2 ) {
      console.log(e.code)
      e.preventDefault();
      e.stopPropagation();
      console.log({E:e, TARGET:e.target, THIS:this.container})
      if(e.target !== this.container){
        
        this.restoreCrops(e);
      }
      document.removeEventListener('mouseup', this.outsideEvents, true)
      document.removeEventListener('keyup', this.outsideEvents, true)
      document.removeEventListener('contextmenu', this.outsideEvents, true)
    }
    
    this.isLeftBtnTarget = false;
  }

  handleMouseMove = (e) => {
    if ((e.button === 0 || e.type === 'touchmove' ) && e.target === this.img) {
    const { onDraw, onChange, coordinates } = this.props
    const { pointA } = this
    if (isValidPoint(pointA)) {
      const pointB = this.getCursorPosition(e)

      // get the drawing coordinate
      const coordinate = {
        x: Math.min(pointA.x, pointB.x),
        y: Math.min(pointA.y, pointB.y),
        width: Math.abs(pointA.x - pointB.x),
        height: Math.abs(pointA.y - pointB.y),
        id: this.id,
      }
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

    
    const { onDraw, onChange, onRestore } = this.props

      
    if (is(Function, onRestore)) {
      onRestore(this.prevCoordinate, this.drawingIndex-1, this.prevCoordinates)
    }

    this.pointA = {};
    this.isLeftBtnTarget = false;
    this.isLeftBtnTarget = false;
    this.isEscBtnTarget = false;
  }


  handleMouseUp = (e) => {

    const { onDraw, onChange } = this.props

    this.pointA = {};
    this.isLeftBtnTarget = false;
    this.isEscBtnTarget = false;
    
  }

  handleMouseLeave = () => {
    console.log(this.isDragResize);
    if (this.isDragResize === false && this.isLeftBtnTarget === true) {
      
      console.log(this.isDragResize);
      document.addEventListener('mouseup', this.outsideEvents, true)
      document.addEventListener('keydown', this.outsideEvents, true)
      document.addEventListener('contextmenu', this.outsideEvents, true)
    }
  } 

  handleMouseEnter = () => {
      document.removeEventListener('mouseup', this.outsideEvents, true)
      document.removeEventListener('keydown', this.outsideEvents, true)
      document.removeEventListener('contextmenu', this.outsideEvents, true)
  } 


   onKeyDown = (e) => {
   if (e.code === "Escape") {
      this.isEscBtnTarget = true;
    } 
  }

  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
  }

  render() {
    const {
      src, width, height, onLoad,
    } = this.props
    return (
      <div
        style={{
          display: 'inline-block',
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
        onContextMenu={this.isLeftBtnTarget ? this.onContextMenu : null}
        onMouseUp={(e)=>{!this.isEscBtnTarget ? this.handleMouseUp(e) : this.restoreCrops(e)}}
        ref={container => this.container = container}
        tabIndex="0"
      >
        <img
          ref={img => this.img = img}
          src={src}
          width={width}
          height={height}
          onLoad={onLoad}
          alt=""
          draggable={false}
        />
        {this.renderCrops(this.props)}

      </div>
    )
  }
}

const {
  string, arrayOf, number, func,
} = PropTypes

MultiCrops.propTypes = {
  coordinates: arrayOf(coordinateType),
  src: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  onDraw: func, // eslint-disable-line
  onChange: func, // eslint-disable-line
  onComplete: func, // eslint-disable-line
  onRestore: func, // eslint-disable-line
  onLoad: func, // eslint-disable-line
}

MultiCrops.defaultProps = {
  coordinates: [],
  src: '',
}

export { removeid, addid } from './utils'
export default MultiCrops

