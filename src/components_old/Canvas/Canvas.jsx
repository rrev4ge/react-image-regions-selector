import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Canvas.module.scss';

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = `canvas_${crop.id}.png`;
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1,
  );
}

const useCanvas = (props, callback) => {
  const { crop, img } = props;
  console.log({ crop });

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  imgRef.current = img;

  useEffect(() => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    callback([canvas, ctx, image]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop]);

  return canvasRef;
};

const Canvas = (props) => {
  const { crop } = props;

  const [isHover, setIsHover] = useState(false);

  const canvasRef = useCanvas(props, ([canvas, ctx, image]) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  });

  return (
    <div
      className={styles.canvasItem}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover && <div className={styles.canvasNumberIcon}>Download</div>}
      <canvas ref={canvasRef} className={styles.canvasImg} />
      {isHover && (
        <div className={styles.canvasDownloadButton} onClick={() => generateDownload(canvasRef.current, crop)}>
          Download
        </div>
      )}
    </div>
  );
};

Canvas.propTypes = {
  crop: PropTypes.object,
  img: PropTypes.object,
};

Canvas.defaultProps = {
  crop: null,
  img: null,
};

export default Canvas;
