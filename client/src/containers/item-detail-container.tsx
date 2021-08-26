import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'lib/router';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';
import { Modal } from 'components';

import { RootState } from 'store';
import { getItem } from 'store/item';
import { addLike, deleteLike } from 'store/like';

import { cartGenerator } from 'utils/cart-generator';
import { PAYMENT_URL } from 'constants/urls';

const MainItemContainer: FC = () => {
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { userId, thumbnail, title, price, contents, isLike, isSoldOut, reviewCount } = useSelector(
    ({ auth, item }: RootState) => ({
      userId: auth.user.userId,
      thumbnail: item.item.thumbnail,
      title: item.item.title,
      price: item.item.price,
      contents: item.item.contents,
      salePercent: item.item.salePercent,
      isLike: item.item.isLike,
      isSoldOut: item.item.isSoldOut,
      reviewCount: item.item.reviewCount,
    }),
  );
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
    } else {
      cartItemsString += `${id},${thumbnail},${title},${count},${price}`;
    }
    localStorage.setItem('cart', cartItemsString);
  };

  const onBuy = () => {
    if (userId) {
      window.sessionStorage.setItem('order', `${id}-${count}`);
      history.push(PAYMENT_URL);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <ItemInfo
        thumbnail={thumbnail}
        title={title}
        price={price}
        likeShow={!!userId}
        isLiked={isLiked}
        setIsLiked={toggleIsLiked}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
        setCount={setCount}
      />
      <Detail contents={contents} reviewCount={reviewCount} />
      <Modal type="alert" header={<div>로그인이 필요합니다</div>} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default MainItemContainer;
