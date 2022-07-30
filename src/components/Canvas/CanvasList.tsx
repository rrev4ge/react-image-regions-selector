import React from 'react';
import Canvas from './Canvas';
import styles from './CanvasList.module.scss';

const CanvasList = (props) => {
  const { canvas , img } = props;
  return (
    <div className={styles.canvasList} style={props.style}>
      {canvas.map((crop, i) => (
        <Canvas key={crop.id || i} crop={crop} img={img} />
      ))}
    </div>
  );
};




export default CanvasList;
