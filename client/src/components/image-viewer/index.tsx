import React, { FC, useCallback, useRef, MouseEvent, useState } from 'react';
import styled from 'lib/woowahan-components';

interface ImageViewerProps {
  className?: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

const Wrapper = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;

  .image-lens {
    position: absolute;
    border: 1px solid ${props => props.theme?.colorGreyLight};
    background-color: rgba(255, 255, 255, 0.3);
    width: 200px;
    height: 200px;
  }
`;

const ZoomContainer = styled.div`
  .image-zoom {
    position: absolute;
    top: 0;
    left: ${props => props.left as string}px;
    width: ${props => props.imgWidth as string}px;
    height: ${props => props.imgWidth as string}px;
    background-image: url(${props => props.targetImg as string});
    background-repeat: no-repeat;
  }
`;

const ImageViewer: FC<ImageViewerProps> = ({ className = '', imgSrc, imgWidth, imgHeight }) => {
  const [isLensVisible, setIsLensVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const showLens = () => setIsLensVisible(true);
  const hideLens = () => setIsLensVisible(false);

  const getCursorPos = (e: MouseEvent): { x: number; y: number } => {
    if (!imgRef.current) return { x: 0, y: 0 };

    const imgClient = imgRef.current.getBoundingClientRect();

    const x = e.pageX - imgClient.left - window.pageXOffset;
    const y = e.pageY - imgClient.top - window.pageYOffset;

    return { x, y };
  };

  const moveLens = useCallback(
    (e: MouseEvent) => {
      if (!imgRef.current || !lensRef.current || !zoomRef.current) return;
      e.preventDefault();

      const img = imgRef.current;
      const lens = lensRef.current;
      const zoom = zoomRef.current;

      const cursorPos = getCursorPos(e);

      let x = cursorPos.x - lens.offsetWidth / 2;
      let y = cursorPos.y - lens.offsetHeight / 2;

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lensRef.current.style.left = `${x}px`;
      lensRef.current.style.top = `${y}px`;

      const cx = zoom.offsetWidth / lens.offsetWidth;
      const cy = zoom.offsetHeight / lens.offsetHeight;

      zoom.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
      zoom.style.backgroundSize = `${imgWidth * cx}px ${imgHeight * cy}px`;
    },
    [imgWidth, imgHeight],
  );

  return (
    <Wrapper className={className}>
      <ImageContainer onMouseEnter={showLens} onMouseLeave={hideLens} onMouseMove={moveLens}>
        <img ref={imgRef} src={imgSrc} alt="item-img" width={`${imgWidth}px`} height={`${imgHeight}px`} />
        {isLensVisible && <div ref={lensRef} className="image-lens" onMouseMove={moveLens} />}
      </ImageContainer>
      {isLensVisible && (
        <ZoomContainer left={imgWidth + 5} imgWidth={imgWidth} imgHeight={imgHeight} targetImg={imgSrc}>
          <div ref={zoomRef} className="image-zoom" />
        </ZoomContainer>
      )}
    </Wrapper>
  );
};

export default ImageViewer;
