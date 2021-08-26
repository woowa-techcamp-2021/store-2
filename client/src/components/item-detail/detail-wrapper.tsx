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
`;

const DetailHeader = styled.div`
  display: flex;
`;

const DetailContent = styled.div`
  border: 3px solid ${({ theme }) => theme?.colorLine};
  background-color: white;
`;

const Marker = styled.div`
  padding: 20px 30px;
  font-size: 24px;
  font-family: ${({ theme }) => theme?.fontHanna};
  background-color: ${({ selected }) => (selected ? 'white' : 'none')};
  width: fit-content;
  border: ${({ selected }) => (selected ? '3px' : '1px')} solid ${({ theme }) => theme?.colorLine};
  border-top: ${({ selected }) => (selected ? '3px' : '1px')} solid ${({ theme }) => theme?.colorLine};
  border-bottom: none;
  color: ${({ theme }) => theme?.colorSoftBlack};
  transform: translateY(3px);
  cursor: pointer;

  span {
    color: ${({ theme }) => theme?.colorPrimary};
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
          <Marker selected={select === 'detail' ? true : ''} onClick={() => detailExecuteScroll()}>
            상품상세정보
          </Marker>
        </div>
        <div>
          <Marker selected={select === 'review' ? true : ''} onClick={() => reviewExecuteScroll()}>
            상품후기 <span>{reviewCount}</span>
          </Marker>
        </div>
      </DetailHeader>
      <DetailContent>{children}</DetailContent>
    </Container>
  );
};

export default DetailWrapper;
