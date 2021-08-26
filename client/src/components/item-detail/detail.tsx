import React, { FC, useRef } from 'react';
import styled from 'lib/woowahan-components';

import { IReview } from 'types/review';

import DetailWrapper from './detail-wrapper';
import ReviewList from './review-list';

interface DetailProps {
  contents: string[];
  reviewCount: number;
  reviews: IReview[];
  itemLoading: boolean;
  reviewLoading: boolean;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .review-loader {
    width: 230px;
    height: 380px;
  }
`;

const DetailImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .detail-empty {
    font-size: 18px;
    font-family: ${({ theme }) => theme?.fontHannaAir};
  }

  img {
    ${({ theme }) => theme?.tablet} {
      width: 100%;
    }
    ${({ theme }) => theme?.mobile} {
      width: 100%;
    }
  }
`;

const Detail: FC<DetailProps> = ({ contents, itemLoading, reviewCount, reviews, reviewLoading }) => {
  const detailRef = useRef<HTMLDivElement>(null);
  const detailExecuteScroll = () => {
    if (detailRef.current) detailRef.current.scrollIntoView();
  };
  const reviewRef = useRef<HTMLDivElement>(null);
  const reviewExecuteScroll = () => {
    if (reviewRef.current) reviewRef.current.scrollIntoView();
  };
  return (
    <Container>
      <DetailWrapper
        select="detail"
        reviewCount={reviewCount}
        detailRef={detailRef}
        detailExecuteScroll={detailExecuteScroll}
        reviewRef={reviewRef}
        reviewExecuteScroll={reviewExecuteScroll}
      >
        <DetailImageWrapper>
          {!contents || contents.length === 0 ? (
            <div className="detail-empty">상품 상세 정보를 준비 중입니다.</div>
          ) : (
            contents.map((content, i) => {
              return <img src={content} key={content} alt={`${i}`} />;
            })
          )}
        </DetailImageWrapper>
      </DetailWrapper>
      <DetailWrapper
        select="review"
        reviewCount={reviewCount}
        detailRef={detailRef}
        detailExecuteScroll={detailExecuteScroll}
        reviewRef={reviewRef}
        reviewExecuteScroll={reviewExecuteScroll}
      >
        <ReviewList reviews={reviews} reviewLoading={reviewLoading} />
      </DetailWrapper>
    </Container>
  );
};

export default Detail;
