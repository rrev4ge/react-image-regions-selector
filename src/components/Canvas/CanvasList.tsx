import React from 'react';
import Canvas from './Canvas';
import styles from './CanvasList.module.scss';

const CanvasList = (props) => {
  const { canvas, img, config } = props;
  return (
    <div
      className={styles.canvasList}
      style={{
        width: img?.width || config?.width,
        height: img?.height ? img.height + 10 : 0,
      }}
    >
      {canvas.map((crop, i) => (
        <Canvas key={crop.id || i} crop={crop} img={img} />
      ))}
    </div>
  );
};

export default CanvasList;
