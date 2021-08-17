import React, { FC } from 'react';
import styled from 'styled-components';
import { Logo } from 'components';

interface FooterProps {
  isMobile: boolean;
}

const Wrapper = styled.footer`
  width: 100%;
  min-height: 200px;
  background-color: ${props => props.theme.colorFooter};
  box-sizing: border-box;
  display: flex;
  padding: 30px 10%;

  ${props => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    padding: 30px 2%;
  }
`;

const Left = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;

  ${props => props.theme.mobile} {
    width: 100%;
    margin-top: 20px;
  }
`;

const Right = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  ${props => props.theme.mobile} {
    width: 100%;
    margin-top: 20px;
  }
`;

const Links = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;

  ul li {
    float: left;
    margin-right: 30px;
  }

  ul li a {
    color: ${props => props.theme.colorSoftBlack};
    font-weight: ${props => props.theme.weightBold};
    font-size: 14px;
  }

  ${props => props.theme.mobile} {
    display: flex;
    justify-content: center;

    ul li {
      margin: 0;
      padding: 0 10px;
    }

    ul li:not(:last-child) {
      border-right: 1px solid ${props => props.theme.colorGreyDark};
    }

    ul li a {
      color: ${props => props.theme.colorGreyDark};
    }
  }
`;

const Info = styled.div`
  p {
    color: ${props => props.theme.colorGreyDark};
    font-size: 12px;
    line-height: 18px;
  }

  ${props => props.theme.mobile} {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 20px;

    p {
      color: ${props => props.theme.colorPointBeigeLight};
      font-family: ${props => props.theme.fontEuljiro};
    }
  }
`;

const Footer: FC<FooterProps> = ({ isMobile }) => {
  return (
    <Wrapper>
      <Left>
        <Logo width="130px" full mobile={isMobile} />
      </Left>
      <Right>
        <Links>
          <ul>
            <li>
              <a target="_blank" rel="noreferrer" href="https://store.baemin.com/board/list.php?bdId=notice">
                공지사항
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://store.baemin.com/service/agreement.php">
                이용약관
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://store.baemin.com/service/private.php">
                개인정보처리방침
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://store.baemin.com/main/html.php?htmid=proc/sales_introduce.html"
              >
                판매처 안내
              </a>
            </li>
          </ul>
        </Links>
        {isMobile ? (
          <Info>
            <p>© 그림의 남자들. 올 롸잇 리절브드</p>
          </Info>
        ) : (
          <Info>
            <p>
              상호 : (주)그림의남자들 | 대표 : 윤민상 | 사업자등록번호 : 120-87-65763 | 통신판매업신고번호 :
              2012-서울송파-0515
            </p>
            <p>팩스번호 : 050-605-0041 | 메일 : baemin_store@woowahan.com | 배민문방구 인스타그램 : @baemin_store</p>
            <p>주소 : 서울특별시 송파구 위례성대로 2 장은빌딩 | 호스팅제공 : AWS</p>
            <p>© Men of the geurim Corp. All right Reserved</p>
          </Info>
        )}
      </Right>
    </Wrapper>
  );
};

export default Footer;
