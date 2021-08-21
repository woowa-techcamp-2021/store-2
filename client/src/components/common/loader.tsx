import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

interface LoaderProps {
  size?: string;
  color?: 'primary' | 'brown' | 'grey';
}

const Wrapper = styled.div`
  width: 100%;
`;

const Spinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(360deg);
    }
  }

  margin: 0 auto;
  width: ${props => props.size as string};
  height: ${props => props.size as string};
  border-radius: 50%;
  border: 3px solid
    ${props => {
      if (props.color === 'brown') return props.theme?.colorLineLight;
      if (props.color === 'grey') return props.theme?.colorGreyLight;
      return props.theme?.colorPrimaryLight;
    }};
  border-top-color: ${props => {
    if (props.color === 'brown') return props.theme?.colorLineDark;
    if (props.color === 'grey') return props.theme?.colorGreyDark;
    return props.theme?.colorPrimaryDark;
  }};
  animation: spinner 600ms linear infinite;
`;

const Loader: FC<LoaderProps> = ({ color, size = '15px' }) => {
  return (
    <Wrapper>
      <Spinner color={color} size={size} />
    </Wrapper>
  );
};

export default Loader;
