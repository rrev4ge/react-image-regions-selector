import React, { useState } from 'react';
import PropTypes from "prop-types";
import { useCanvas } from "../../hooks";

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

const Canvas = (props) => {
    const {crop} = props;

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
            crop.height
        );
    });

    return (
        <div style={{position: "relative"}}
             onMouseEnter={() => {
                 setIsHover(true)
             }}
             onMouseLeave={() => {
                 setIsHover(false)
             }}
        >
            <canvas
                ref={canvasRef}
            />
            {isHover &&
            <div style={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "white",
                border: "1px solid white",
                borderRadius: 2,
                padding: "0 4px",
                background: "#262626",
                opacity: 0.5,
                cursor: "pointer",
            }}
                 onClick={() =>
                     generateDownload(canvasRef.current, crop)
                 }
            >Download</div>
            }</div>
    );
};

Canvas.propTypes = {
    crop: PropTypes.object,
    img: PropTypes.object,
};

Canvas.defaultProps = {
    crop: null,
    img: null,
}

export default Canvas;
