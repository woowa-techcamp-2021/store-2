import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'lib/router';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';
import { Modal } from 'components';

import { RootState } from 'store';
import { getItem } from 'store/item';

import { PAYMENT_URL } from 'constants/urls';

const MainItemContainer: FC = () => {
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { thumbnail, title, price, contents, isLike, isSoldOut, reviewCount, userId } = useSelector(
    ({ item, auth }: RootState) => ({
      thumbnail: item.item.thumbnail,
      title: item.item.title,
      price: item.item.price,
      contents: item.item.contents,
      salePercent: item.item.salePercent,
      isLike: item.item.isLike,
      isSoldOut: item.item.isSoldOut,
      reviewCount: item.item.reviewCount,
      userId: auth.user.userId,
    }),
  );

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
  }, [id, dispatch]);

  const onSubmitCart = () => {
    // TODO: 장바구니 추가
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
        isLike={isLike}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
        setCount={setCount}
      />
      <Detail contents={contents} reviewCount={reviewCount} />
      <Modal type="alert" body="로그인이 필요합니다" visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default MainItemContainer;
