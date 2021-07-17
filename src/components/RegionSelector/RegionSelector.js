import Canvas from './../Canvas/Canvas';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MultiCrops from './../MultiCrops/MultiCrops';



const canvasListStyle = {
  display: 'flex',
  flexFlow: 'row wrap', 
  alignItems: 'center',
  justifyAlign: 'center',
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
    imgRef.current = img.target;
  }, []);

  const onChange = useCallback((crop, index, crops) => {
    setCrops(crops);
  }, []);

  const onDelete = useCallback((crop, index, crops) => {
    setCrops(crops);
    setCompletedCrops(crops);
  }, []);

  const onComplete = useCallback((crop, index, crops) => {
    setCompletedCrops(crops);
  }, []);

  // useEffect(() => {
    
  // }, [completedCrops])

    return (
      <div style={regionSelectorStyle}>
        <MultiCrops
          src={src}
          width={'600'}
          coordinates={crops}
          onChange={onChange}
          onDelete={onDelete}
          onComplete={onComplete}
          onLoad={onLoad}
        />
        <div style={canvasListStyle}>
          {completedCrops.map( (crop) =>
            <Canvas
              key={crop.id}
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
