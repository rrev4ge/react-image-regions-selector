
import React, { useEffect, useRef } from 'react';

const canvasStyle = {
  padding: '10px',
}

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
    1
  );
}

const useCanvas = (props, callback) => {
    const {crop, img} = props;

    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    imgRef.current = img;

    useEffect(() => {
        const image = imgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        callback([canvas, ctx, image]);
    }, [crop]);

    return canvasRef;
}

const Canvas = (props) => {
    const {crop, img} = props;

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
      crop.height
    );
  });

  return (<canvas 
    ref={canvasRef} 
    style={canvasStyle}
    onClick={() =>
          generateDownload(canvasRef.current, crop)}
/>);
};

export default Canvas;
