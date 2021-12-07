import { useEffect, useRef } from "react";


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [crop]);

    return canvasRef;
}

export default useCanvas;