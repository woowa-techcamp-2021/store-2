import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import bannerImg from 'assets/images/beer.png';
import tagImg from 'assets/icons/tag.png';

const Container = styled.div`
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
`;

const Item = styled.div`
  position: relative;

  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tag {
    margin-top: 80px;
  }
`;

const Banner: FC = () => {
  return (
    <Container>
      <Inner>
        <div />
      </Inner>
      <Title>푸랫쉬한 맥주-짠</Title>
      <Item>
        <img className="item" src={bannerImg} alt="banner-img" height="300px" />
        <img className="tag" src={tagImg} alt="banner-img" />
      </Item>
    </Container>
  );
};

export default Banner;
