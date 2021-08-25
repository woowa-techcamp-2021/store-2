import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'lib/router';

import ItemDetail from 'components/item-detail';

import { RootState } from 'store';
import { getItem } from 'store/item';

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

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
  }, [id, dispatch]);

  const onSubmitCart = (count: number) => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', `${id},${thumbnail},${title},${count},${price}`);
    } else {
      const data = localStorage.getItem('cart') as string;
      localStorage.setItem('cart', `${data},${id},${thumbnail},${title},${count},${price}`);
    }
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
