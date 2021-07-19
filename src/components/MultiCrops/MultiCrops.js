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

  isEscBtnTarget = false
  isNewCrop = false
  coorList=[]
  isLeftBtnTarget = false

  

  renderCrops = (props) => {
    const indexedMap = addIndex(map)
    return indexedMap((coor, index) =>
      (<Crop
        // improve performance when delet crop in middle array
        key={coor.id || index}
        index={index}
        coordinate={coor}
        {...props}
      />))(props.coordinates)
  }

  

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  handleMouseDown = (e) => {
    const { coordinates } = this.props
    if (e.button === 0) {

      this.isLeftBtnTarget = true;
      
      if (e.target === this.img || e.target === this.container) {
        const { x, y } = this.getCursorPosition(e)

        this.drawingIndex = coordinates.length;
        this.pointA = { x, y };
        this.id = shortid.generate();
        this.leftClickActive = true;
        this.prevCoordinate = {};
        this.prevCoordinates = clone(coordinates);
      
      }
      
    }
  }


  handleMouseMove = (e) => {

    if (e.button === 0 && this.isEscBtnTarget === true) {
      return null
    }
    if (e.button === 0 && this.isEscBtnTarget === false) {
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

  resetCrop = (e) => {

    
    const { onDraw, onChange, onRestore } = this.props

      
    if (is(Function, onRestore)) {
      onRestore(this.prevCoordinate, this.drawingIndex-1, this.prevCoordinates)
    }
    // if (is(Function, onDraw)) {
    //   onDraw(this.prevCoordinate, this.drawingIndex, this.prevCoordinates)
    // }

    this.pointA = {};
    this.isNewCrop = false;
    this.isLeftBtnTarget = false;
    this.isEscBtnTarget = false;
  }


  handleMouseUp = (e) => {

    const { onDraw, onChange } = this.props

    
    this.pointA = {};
    this.isNewCrop = false;
    this.isLeftBtnTarget = false;
    this.isEscBtnTarget = false;
  }

  onKeyDownParent = (e) => {
   if (e.code === "Escape") {
      this.isEscBtnTarget = true;
    } 
  }

  onKeyUpParent = (e) => {
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
        }}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={()=>(!this.isEscBtnTarget ? this.handleMouseUp() : this.resetCrop())}
        ref={container => this.container = container}
        onKeyDown={this.onKeyDownParent}
        onKeyUp={this.onKeyUpParent}
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

