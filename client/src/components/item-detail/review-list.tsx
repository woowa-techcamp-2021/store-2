import React, { FC, useCallback, useState } from 'react';
import styled from 'lib/woowahan-components';

import starOn from 'assets/icons/star_on.png';
import starOff from 'assets/icons/star_off.png';

import { IReview } from 'types/review';

import { filterId } from 'utils';

interface IReviewListProps {
  reviews: IReview[];
  reviewLoading: boolean;
}

const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;

const Review = styled.div`
  margin: 0 20px;
  padding: 20px 15px;
  border-bottom: 1px solid ${props => props.theme?.colorGreyLight};

  &:first-child {
    border-top: 3px solid ${props => props.theme?.colorGreyLight};
  }

  .review-header {
    cursor: pointer;
    display: flex;

    .star-area {
      margin-right: 15px;
    }

    .title-area {
      font-weight: ${props => (props.isSelected ? props.theme?.weightBold : 'normal')};
    }

    .user-area {
      margin-left: auto;
    }
  }

  .review-content {
    margin-top: 20px;
    display: flex;

    img {
      width: 200px;
      margin-right: 30px;

      ${({ theme }) => theme?.mobile} {
        width: 100px;
      }
      ${({ theme }) => theme?.tablet} {
        width: 150px;
      }
    }

    div {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .star {
    width: 18px;
    height: 17px;
  }
`;

const Empty = styled.div`
  font-size: 80px;
  color: ${({ theme }) => theme?.colorLine};
  text-align: center;
  font-family: ${({ theme }) => theme?.fontEuljiro10};
`;

const makeStar = (score: number): boolean[] => {
  const star: boolean[] = [];
  while (star.length !== 5) {
    if (score <= star.length) star.push(true);
    else star.push(false);
  }
  return star;
};

const ReviewList: FC<IReviewListProps> = ({ reviews, reviewLoading }) => {
  const [state, setState] = useState<null | number>(null);

  const handleReviewClick = useCallback(
    idx => {
      if (idx === state) setState(null);
      else setState(idx);
    },
    [state],
  );

  return (
    <Wrapper>
      {!reviewLoading && reviews.length === 0 && <Empty>텅</Empty>}
      {reviews.map((review, idx) => {
        const { score, title, imgUrl, contents, userId } = review;
        return (
          <Review key={title + String(idx)} isSelected={idx === state}>
            <div className="review-header" onClick={() => handleReviewClick(idx)} aria-hidden="true">
              <div className="star-area">
                {makeStar(score).map((star, i) => {
                  if (star)
                    return <img key={title + String(idx) + String(i)} src={starOff} className="star" alt="startOff" />;
                  return <img key={title + String(idx) + String(i)} src={starOn} className="star" alt="startOff" />;
                })}
              </div>
              <div className="title-area">{title}</div>
              <div className="user-area">{filterId(userId)}</div>
            </div>
            {idx === state && (
              <div className="review-content">
                {imgUrl && (
                  <a target="_blank" rel="noreferrer" href={imgUrl}>
                    <img src={imgUrl} alt="후기 이미지" />
                  </a>
                )}
                <div>{contents}</div>
              </div>
            )}
          </Review>
        );
      })}
    </Wrapper>
  );
};

export default ReviewList;
