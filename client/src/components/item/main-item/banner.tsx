import React, { FC } from 'react';
import { useHistory } from 'lib/router';
import styled from 'lib/woowahan-components';

import bannerImg from 'assets/images/beer.png';
import tagImg from 'assets/icons/tag.png';

import { ITEM_URL } from 'constants/urls';

const Container = styled.div`
  cursor: pointer;
  height: 500px;
  margin: 0 16px;
  box-sizing: border-box;
  background-color: ${props => props.theme?.colorTextBrown};
  border: 2px solid ${props => props.theme?.colorWhite};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${props => props.theme?.tablet} {
    height: 400px;
  }

  ${props => props.theme?.mobile} {
    height: 300px;
    margin-top: 30px;
  }
`;

const Inner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 5px;

  div {
    width: 100%;
    height: 100%;
    border: 1px solid ${props => props.theme?.colorWhite};
  }
`;

const Title = styled.h2`
  color: ${props => props.theme?.colorFooter};
  font-family: ${props => props.theme?.fontHanna};
  font-size: 40px;
  margin-bottom: 15px;
  text-align: center;

  ${props => props.theme?.tablet} {
    font-size: 36px;
  }

  ${props => props.theme?.mobile} {
    font-size: 28px;
  }
`;

const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
  }

  .tag {
    width: 80%;
    margin-top: 80px;
  }
`;

const Banner: FC = () => {
  const history = useHistory();

  const goBannerItemPage = () => {
    history.push(`${ITEM_URL}/73`);
  };

  return (
    <Container onClick={goBannerItemPage}>
      <Inner>
        <div />
      </Inner>
      <Title>푸랫쉬한 맥주-짠</Title>
      <Item>
        <img className="item" src={bannerImg} alt="banner-img" />
        <img className="tag" src={tagImg} alt="banner-img" />
      </Item>
    </Container>
  );
};

export default Banner;
