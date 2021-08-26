import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'lib/router';

import { IReview } from 'types/review';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';
import { Modal } from 'components';

import { RootState } from 'store';
import { getItem } from 'store/item';
import ReviewPost from 'components/item-detail/review-post';

const mockupReview: IReview[] = [
  {
    id: 1,
    score: 5,
    title: '후기제목',
    content: '아니 너무 좋아요아니 너무 좋아요아니 너무 좋아요아니 너무 좋아요아니 너무 좋아요',
    imgUrl: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/342_main_016.jpg',
    userId: 'guest',
  },
  {
    id: 2,
    score: 4,
    title: '후기제목',
    content: '내요옹',
    imgUrl: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/342_main_016.jpg',
    userId: 'abcd',
  },
];

import { PAYMENT_URL } from 'constants/urls';

const MainItemContainer: FC = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState<null | File>(null);
  const [star, setStar] = useState(5);
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // TODO: 리뷰 리스트, 리뷰 카운트
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit btn');
    console.log(postTitle, postContent, file, star);
    // TODO: dispatch
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
      <Detail contents={contents} reviewCount={reviewCount} reviews={mockupReview} />
      <ReviewPost
        userId={userId}
        postTitle={postTitle}
        postContent={postContent}
        setPostTitle={setPostTitle}
        setPostContent={setPostContent}
        setFile={setFile}
        star={star}
        setStar={setStar}
        onSubmit={onSubmit}
      />
      <Modal type="alert" body="로그인이 필요합니다" visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default MainItemContainer;
