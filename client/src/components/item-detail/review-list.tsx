import React, { FC, useState } from 'react';
import styled from 'lib/woowahan-components';

import noImage from 'assets/images/no_image.png';
import starOn from 'assets/icons/star_on.png';
import starOff from 'assets/icons/star_off.png';

import { IReview } from 'types/review';

import { filterId } from 'utils';

interface IReviewListProps {
  reviews: IReview[];
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const Review = styled.div`
  border-top: 1px solid #dbdbdb;
  padding: 10px;
  margin: 0 20px;
  &:first-child {
    border-top: 2px solid #999999;
  }
  > div:first-child {
    display: flex;
  }
  > div:first-child > div:first-child {
    margin-right: 15px;
  }
  > div:first-child > div:last-child {
    margin-left: auto;
  }
  > div:last-child {
    margin-top: 20px;
    display: flex;
    > img {
      width: 200px;
      margin-right: 30px;
      ${({ theme }) => theme?.mobile} {
        width: 100px;
      }
      ${({ theme }) => theme?.tablet} {
        width: 150px;
      }
    }
  }
`;

const makeStar = (score: number): boolean[] => {
  const star: boolean[] = [];
  while (star.length !== 5) {
    if (score <= star.length) star.push(true);
    else star.push(false);
  }
  return star;
};

const ReviewList: FC<IReviewListProps> = ({ reviews }) => {
  const [state, setState] = useState<null | number>(null);
  return (
    <Wrapper>
      {reviews.map((review, idx) => {
        const { score, title, imgUrl, contents, userId } = review;
        return (
          <Review key={title + String(idx)} onClick={() => setState(idx)}>
            <div>
              <div>
                {makeStar(score).map((v, i) => {
                  if (v) return <img key={title + String(idx) + String(i)} src={starOff} alt="startOff" />;
                  return <img key={title + String(idx) + String(i)} src={starOn} alt="startOff" />;
                })}
              </div>
              <div>{title}</div>
              <div>{filterId(userId)}</div>
            </div>
            {idx === state && (
              <div>
                <img src={imgUrl || noImage} alt="후기 이미지" />
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
