import React, { FC, useCallback, useRef, MouseEvent } from 'react';
import styled from 'lib/woowahan-components';

interface ImageViewerProps {
  className?: string;
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
}

const Wrapper = styled.div`
  position: relative;

  .image-lens {
    position: absolute;
    border: 1px solid ${props => props.theme?.colorGreyLight};
    background-color: rgba(255, 255, 255, 0.3);
    width: 200px;
    height: 200px;
  }

  .image-zoom {
    position: absolute;
    top: 0;
    left: ${props => props.left as string}px;
    width: ${props => props.imgWidth as string}px;
    height: ${props => props.imgWidth as string}px;
    background-image: url(${props => props.targetImg as string});
    background-size: ${props => props.resultSize as string};
    background-repeat: none;
  }
`;

const ImageViewer: FC<ImageViewerProps> = ({ className = '', imgSrc, imgWidth, imgHeight }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const getCursorPos = (e: MouseEvent): { x: number; y: number } => {
    if (!imgRef.current) return { x: 0, y: 0 };

    const imgClient = imgRef.current.getBoundingClientRect();

    const x = e.pageX - imgClient.left - window.pageXOffset;
    const y = e.pageY - imgClient.top - window.pageYOffset;

    return { x, y };
  };

  const moveLens = useCallback((e: MouseEvent) => {
    if (!imgRef.current || !lensRef.current || !zoomRef.current) return;
    e.preventDefault();

    const img = imgRef.current;
    const lens = lensRef.current;
    const zoom = zoomRef.current;

    const cursorPos = getCursorPos(e);

    if (cursorPos.x > img.width - 30 || cursorPos.x < 30 || cursorPos.y > img.height - 30 || cursorPos.y < 30) {
      lens.style.display = 'none';
      zoom.style.display = 'none';
    } else {
      lens.style.display = 'block';
      zoom.style.display = 'block';
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
    }
  }, []);

  const calcBgSize = () => {
    if (!zoomRef.current || !lensRef.current) return '';

    const zoom = zoomRef.current;
    const lens = lensRef.current;

    const cx = zoom.offsetWidth / lens.offsetWidth;
    const cy = zoom.offsetHeight / lens.offsetHeight;

    return `${imgWidth * cx}px ${imgHeight * cy}px`;
  };

  return (
    <Wrapper
      className={className}
      left={imgWidth + 5}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      targetImg={imgSrc}
      resultSize={calcBgSize()}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        alt="item-img"
        width={`${imgWidth}px`}
        height={`${imgHeight}px`}
        onMouseMove={moveLens}
      />
      <div ref={lensRef} className="image-lens" onMouseMove={moveLens} />
      <div ref={zoomRef} className="image-zoom" />
    </Wrapper>
  );
};

export default ImageViewer;
