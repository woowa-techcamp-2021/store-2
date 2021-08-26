import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'lib/router';

import ItemDetail from 'components/item-detail';

import { RootState } from 'store';
import { getItem } from 'store/item';
import { cartGenerator } from 'utils/cart-generator';

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
    let cartItemsString = '';

    if (localStorage.getItem('cart') !== null) {
      const cartItems = cartGenerator();
      if (cartItems.some(item => item.id === id)) {
        cartItems.forEach((item, index) => {
          if (item.id === id) {
            cartItems[index].count += count;
          }
        });
      } else {
        cartItems.push({
          id,
          thumbnail,
          title,
          count,
          price,
        });
      }
      cartItems.forEach(item => {
        cartItemsString += `${item.id},${item.thumbnail},${item.title},${item.count},${item.price},`;
      });
      cartItemsString = cartItemsString.slice(0, cartItemsString.length - 1);
    }
    localStorage.setItem('cart', cartItemsString);
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
