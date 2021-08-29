import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

interface DetailWrapperProps {
  select: 'detail' | 'review';
  reviewCount: number;
  detailRef: React.RefObject<HTMLDivElement>;
  detailExecuteScroll: () => void;
  reviewRef?: React.RefObject<HTMLDivElement>;
  reviewExecuteScroll: () => void;
}

const Container = styled.div`
  width: 100%;
  margin-top: 80px;

  &:last-child {
    margin-bottom: 80px;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  margin-left: 10%;

  ${({ theme }) => theme?.mobile} {
    margin-left: 0;
  }
`;

const DetailContent = styled.div`
  border: 3px solid ${({ theme }) => theme?.colorLine};
  background-color: white;
  padding: 5%;
  min-height: 100px;
`;

const Marker = styled.div`
  cursor: pointer;
  padding: 20px 30px;
  font-size: 20px;
  font-family: ${({ theme }) => theme?.fontHanna};
  color: ${({ theme }) => theme?.colorSoftBlack};
  background-color: ${({ theme }) => theme?.colorWhite};
  width: fit-content;
  border: ${({ selected }) => (selected ? '3px' : '0')} solid ${({ theme }) => theme?.colorLine};
  border-bottom: ${({ selected }) => (selected ? '0' : '3px')} solid ${({ theme }) => theme?.colorLine};
  transform: translateY(3px);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  span {
    color: ${({ theme }) => theme?.colorPrimary};
    margin-left: 3px;
  }

  ${({ theme }) => theme?.mobile} {
    font-size: 16px;
    flex: 1;
    text-align: center;
  }
`;

const DetailWrapper: FC<DetailWrapperProps> = ({
  children,
  select,
  reviewCount,
  detailRef,
  detailExecuteScroll,
  reviewRef,
  reviewExecuteScroll,
}) => {
  const refs = select === 'detail' ? detailRef : reviewRef;
  return (
    <Container>
      <DetailHeader>
        <div ref={refs}>
          <Marker selected={select === 'detail'} onClick={() => detailExecuteScroll()}>
            상품상세정보
          </Marker>
        </div>
        <div>
          <Marker selected={select === 'review'} onClick={() => reviewExecuteScroll()}>
            상품후기 <span>{reviewCount}</span>
          </Marker>
        </div>
      </DetailHeader>
      <DetailContent>{children}</DetailContent>
    </Container>
  );
};

export default DetailWrapper;
