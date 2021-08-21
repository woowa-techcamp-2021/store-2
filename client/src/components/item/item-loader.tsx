import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

const Content = styled.div`
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: placeHolderShimmer;
  background: #f6f7f8;
  background: linear-gradient(to right, #e3d7c5 8%, #e8ddcc 18%, #e3d7c5 33%);
  background-size: 800px 104px;
  position: relative;
  border-radius: 10px;
  width: 230px;
  height: 380px;

  ${props => props.theme?.mobile} {
    width: 150px;
    height: 280px;
  }

  ${props => props.theme?.tablet} {
    width: 180px;
    height: 320px;
  }
`;

const ItemLoader: FC = () => {
  return (
    <>
      <Content /> <Content /> <Content /> <Content />
    </>
  );
};

export default ItemLoader;
