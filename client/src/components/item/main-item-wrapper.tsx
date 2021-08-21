import React, { FC } from 'react';
import styled from 'lib/woowahan-components';
import { IItem } from 'types/item';
import { Loader } from 'components';
import DisplayItemList from './display-item-list';

interface MainItemWrapperProps {
  popularItems: IItem[];
  newItems: IItem[];
  recommendItems: IItem[];
  loading: boolean;
}

const Wrapper = styled.div`
  margin-top: 60px;
`;

const MainItemWrapper: FC<MainItemWrapperProps> = ({ popularItems, newItems, recommendItems, loading }) => {
  return (
    <Wrapper>
      {loading && <Loader size="25px" color="brown" />}
      <DisplayItemList title="잘나가요" items={popularItems} />
      <DisplayItemList title="새로 나왔어요" items={newItems} />
      <DisplayItemList title="추천드려요" items={recommendItems} />
    </Wrapper>
  );
};

export default MainItemWrapper;
