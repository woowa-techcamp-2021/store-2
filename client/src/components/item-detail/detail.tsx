import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import { IReview } from 'types/review';
import DetailWrapper from './detail-wrapper';
import ReviewList from './review-list';

interface DetailProps {
  contents: string[];
  reviewCount: number;
  reviews: IReview[];
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

const Detail: FC<DetailProps> = ({ contents, reviewCount, reviews }) => {
  return (
    <Container>
      <DetailWrapper select="detail" reviewCount={reviewCount}>
        <DetailImageWrapper>
          {contents.map((v, i) => {
            return <img src={v} key={v} alt={`${i}`} />;
          })}
        </DetailImageWrapper>
      </DetailWrapper>
      <DetailWrapper select="review" reviewCount={reviewCount}>
        <ReviewList reviews={reviews} />
      </DetailWrapper>
    </Container>
  );
};

export default Detail;
