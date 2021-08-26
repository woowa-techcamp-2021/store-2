import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'lib/router';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';
import { Modal, Pagination } from 'components';

import { PAYMENT_URL } from 'constants/urls';

import { RootState } from 'store';
import { getItem } from 'store/item';
import ReviewPost from 'components/item-detail/review-post';
import { getReviews, postReview } from 'store/review';
import { addLike, deleteLike } from 'store/like';

import { cartGenerator } from 'utils/cart-generator';

const MainItemContainer: FC = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [file, setFile] = useState<null | File>(null);
  const [star, setStar] = useState(5);
  const [count, setCount] = useState(1);
  const [pageId, setPageId] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { thumbnail, title, price, contents, isLike, isSoldOut, userId, error, reviews, pageCount, totalCount } =
    useSelector(({ item, auth, review }: RootState) => ({
      thumbnail: item.item.thumbnail,
      title: item.item.title,
      price: item.item.price,
      contents: item.item.contents,
      salePercent: item.item.salePercent,
      isLike: item.item.isLike,
      isSoldOut: item.item.isSoldOut,
      userId: auth.user.userId,
      error: review.error,
      reviews: review.list.reviews,
      pageCount: review.list.pageCount,
      totalCount: review.list.totalCount,
    }));
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setPostTitle('');
    setPostContent('');
    setFile(null);
    setStar(5);
  }, [reviews]);

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
    dispatch({ type: getReviews.type, payload: { itemId: id, pageId } });
  }, [id, dispatch, pageId]);

  useEffect(() => {
    setIsLiked(isLike);
  }, [isLike]);

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', postTitle);
    data.append('contents', postContent);
    data.append('image', file as unknown as Blob);
    data.append('score', String(star));
    data.append('itemId', id);
    dispatch({
      type: postReview.type,
      payload: { data },
    });
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
      <Detail contents={contents} reviewCount={totalCount} reviews={reviews} />
      <Pagination pageCount={pageCount} activePage={pageId} setActivePage={setPageId} />
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
        error={error}
      />
      <Modal type="alert" body="로그인이 필요합니다" visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default MainItemContainer;
