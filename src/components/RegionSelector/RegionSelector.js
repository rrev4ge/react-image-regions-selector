import Canvas from './../Canvas/Canvas';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MultiCrops from './../MultiCrops/MultiCrops';



const canvasListStyle = {
  display: 'flex',
  flexFlow: 'row wrap', 
  alignItems: 'start',
  justifyAlign: 'start',
  justifyContent: 'start',
  width: 'inherit',
  height: '300px',
  overflow: 'auto',
  backgroundColor: 'lightgrey',
}

const regionSelectorStyle = {
  width: '600px',
  height: '70vh',
  backgroundColor: 'lightgrey'
}

const RegionSelector = (props) => {

  const {src} = props;

  const [crops, setCrops] = useState([]);
  const [completedCrops, setCompletedCrops] = useState([]);
  const imgRef = useRef(null);

  const onLoad = useCallback((img) => {
    setCrops([]);
    setCompletedCrops([]);
    imgRef.current = img.target;
  }, []);

  const onChange = useCallback((crop, index, crops) => {
    setCrops(crops);
  }, []);

  const onDelete = useCallback((crop, index, crops) => {
    setCrops(crops);
    setCompletedCrops(crops);
  }, []);

  const onRestore = useCallback((crop, index, crops) => {
    setCrops(crops);
    setCompletedCrops(crops);
  }, []);


  return (
    <div 
    style={regionSelectorStyle} 
    onClick={(e)=>{if (e.button === 0){setCompletedCrops(crops)}}}>
      <MultiCrops
        src={src}
        width={'600'}
        coordinates={crops}
        onChange={onChange}
        onDelete={onDelete}
        onRestore={onRestore}
        onLoad={onLoad}
        
      />
      <div style={canvasListStyle}>
        {completedCrops.map( (crop, i) =>
          <Canvas
            index={crop.id || i}
            key={crop.id || i}
            crop={crop}
            img={imgRef.current}
          />
          )
        }
      </div>
    </div>
  );
}

export default RegionSelector;
