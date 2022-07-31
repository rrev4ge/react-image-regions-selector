import { MutableRefObject, useEffect, useRef, useState } from 'react';

const useCanvas = (props, callback): MutableRefObject<HTMLCanvasElement | null> => {
  const { crop, img } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  imgRef.current = img;

  useEffect(() => {
    const image = imgRef.current;
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasContext = canvas.getContext('2d');
      if (canvasContext) {
        callback([canvas, canvasContext, image]);
      }
    }
  }, [crop]);

  return canvasRef;
};

export default useCanvas;
