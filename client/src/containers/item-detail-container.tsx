import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'lib/router';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';

import { RootState } from 'store';
import { getItem } from 'store/item';
import { addLike, deleteLike } from 'store/like';

const MainItemContainer: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { thumbnail, title, price, contents, isLike, isSoldOut, reviewCount } = useSelector(({ item }: RootState) => ({
    thumbnail: item.item.thumbnail,
    title: item.item.title,
    price: item.item.price,
    contents: item.item.contents,
    salePercent: item.item.salePercent,
    isLike: item.item.isLike,
    isSoldOut: item.item.isSoldOut,
    reviewCount: item.item.reviewCount,
  }));
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(isLike);
  }, [isLike]);

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
  }, [id, dispatch]);

  const toggleIsLiked = () => {
    if (!isLiked) {
      dispatch({ type: addLike.type, payload: id });
      setIsLiked(true);
    } else {
      dispatch({ type: deleteLike.type, payload: id });
      setIsLiked(false);
    }
  };

  const onSubmitCart = () => {
    // TODO: 장바구니 추가
  };

  const onBuy = () => {
    // TODO: 상품 구매
  };

  return (
    <>
      <ItemInfo
        thumbnail={thumbnail}
        title={title}
        price={price}
        isLiked={isLiked}
        setIsLiked={toggleIsLiked}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
      />
      <Detail contents={contents} reviewCount={reviewCount} />
    </>
  );
};

export default MainItemContainer;
