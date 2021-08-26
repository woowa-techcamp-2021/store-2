import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import { IItem } from 'types/item';

import { ITEM_URL } from 'constants/urls';

import { RootState } from 'store';
import { addLike, deleteLike } from 'store/like';

import Item from 'components/item/item';

interface ItemContainerProps {
  item: IItem;
}

const ItemContainer: FC<ItemContainerProps> = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(item.isLike);
  const { userId } = useSelector(({ auth }: RootState) => ({
    userId: auth.user.userId,
  }));

  const goDetailPage = useCallback((id: number) => () => history.push(`${ITEM_URL}/${id}`), [history]);

  const toggleIsLiked = () => {
    if (!isLiked) {
      dispatch({ type: addLike.type, payload: item.id });
      setIsLiked(true);
    } else {
      dispatch({ type: deleteLike.type, payload: item.id });
      setIsLiked(false);
    }
  };

  return (
    <Item
      thumbnail={item.thumbnail}
      title={item.title}
      price={item.price}
      isBest={item.isBest}
      isGreen={item.isGreen}
      isNew={item.isNew}
      salePercent={item.salePercent}
      originalPrice={item.originalPrice}
      likeShow={!!userId}
      isLiked={isLiked}
      setIsLiked={toggleIsLiked}
      onClick={goDetailPage(item.id)}
    />
  );
};

export default ItemContainer;
