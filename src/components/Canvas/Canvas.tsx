import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCanvas } from '../../hooks';

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }
  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = `crop_${crop.id}.png`;
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1,
  );
}

export interface ICanvasProps {
  crop: any;
  img: any;
}

const Canvas = (props) => {
  const { crop = null, img = null } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  const canvasRef = useCanvas(props, ([canvas, canvasContext, image]) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    canvasContext.imageSmoothingQuality = 'high';

    canvasContext.drawImage(
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
      style={{ position: 'relative' }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <canvas ref={canvasRef} />
      {isHover && (
        <div
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: 'white',
            border: '1px solid white',
            borderRadius: 2,
            padding: '0 4px',
            background: '#262626',
            opacity: 0.5,
            cursor: 'pointer',
          }}
          onClick={() => generateDownload(canvasRef.current, crop)}
        >
          Download
        </div>
      )}
    </div>
  );
};

export default Canvas;
