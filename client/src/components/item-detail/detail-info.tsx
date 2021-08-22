import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import DetailWrapper from './detail-wrapper';

interface DetailInfoProps {
  contents: string[];
  reviewCount: number;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DetailImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    ${({ theme }) => theme?.tablet} {
      width: 100%;
    }
    ${({ theme }) => theme?.mobile} {
      width: 100%;
    }
  }
`;

const DetailInfo: FC<DetailInfoProps> = ({ contents, reviewCount }) => {
  return (
    <Container>
      <DetailWrapper select={1} reviewCount={reviewCount}>
        <DetailImageWrapper>
          {contents.map((v, i) => {
            return <img src={v} key={v} alt={`${i}`} />;
          })}
        </DetailImageWrapper>
      </DetailWrapper>
      <DetailWrapper select={2} reviewCount={reviewCount}>
        후기
      </DetailWrapper>
    </Container>
  );
};

export default DetailInfo;
