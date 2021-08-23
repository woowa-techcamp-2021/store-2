import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'lib/router';

import ItemDetail from 'components/item-detail';

import { RootState } from 'store';
import { getItem } from 'store/item';

const MainItemContainer: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { thumbnail, title, price, contents, isLike, isSoldOut, reviewCount } = useSelector(({ items }: RootState) => ({
    thumbnail: items.item.thumbnail,
    title: items.item.title,
    price: items.item.price,
    contents: items.item.contents,
    salePercent: items.item.salePercent,
    isLike: items.item.isLike,
    isSoldOut: items.item.isSoldOut,
    reviewCount: items.item.reviewCount,
  }));

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
  }, [id, dispatch]);

  const onSubmitCart = () => {
    // TODO: 장바구니 추가
  };

  const onBuy = () => {
    // TODO: 상품 구매
  };

  return (
    <ItemDetail
      thumbnail={thumbnail}
      title={title}
      price={price}
      contents={contents}
      isLike={isLike}
      isSoldOut={isSoldOut}
      reviewCount={reviewCount}
      onSubmitCart={onSubmitCart}
      onBuy={onBuy}
    />
  );
};

export default MainItemContainer;
