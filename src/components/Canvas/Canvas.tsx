import React, { useEffect, useRef, useState } from 'react';
import { TCoordinateType } from '../MultiCrops/Crop/CropFC';
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

const useCanvas = (
  props: { crop: TCoordinateType; img: HTMLImageElement },
  callback,
) => {
  const { crop = null, img = null } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  imgRef.current = img;

  useEffect(() => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    callback([canvas, ctx, image]);
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
      {isHover && <div className={styles.canvasContent}>{crop.content}</div>}
      <canvas ref={canvasRef} className={styles.canvasImg} />
      {isHover && (
        <div
          className={styles.canvasDownloadButton}
          onClick={() => generateDownload(canvasRef.current, crop)}
        >
          Download
        </div>
      )}
    </div>
  );
};

export default Canvas;
