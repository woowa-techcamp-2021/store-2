import styled from 'lib/woowahan-components';

const ContentLoader = styled.div`
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
`;

export default ContentLoader;
