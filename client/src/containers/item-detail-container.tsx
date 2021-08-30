import React, { FC, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'lib/router';

import { PAYMENT_URL } from 'constants/urls';

import { RootState } from 'store';
import { getItem } from 'store/item';
import { getReviews, postReview } from 'store/review';
import { addLike, deleteLike } from 'store/like';

import { cartGenerator } from 'utils/cart-generator';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';
import ReviewPost from 'components/item-detail/review-post';
import LoginModal from 'components/auth/login-modal';

const ItemDetailContainer: FC = () => {
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

  const {
    thumbnail,
    title,
    price,
    originalPrice,
    contents,
    salePercent,
    isLike,
    isSoldOut,
    userId,
    error,
    reviews,
    pageCount,
    totalCount,
    reviewLoading,
    reviewSubmitLoading,
    itemLoading,
    isPaid,
  } = useSelector(
    ({ item, auth, review, loading }: RootState) => ({
      thumbnail: item.item.thumbnail,
      title: item.item.title,
      price: item.item.price,
      originalPrice: item.item.originalPrice,
      contents: item.item.contents,
      salePercent: item.item.salePercent,
      isLike: item.item.isLike,
      isSoldOut: item.item.isSoldOut,
      userId: auth.user.userId,
      error: review.error,
      reviews: review.list.reviews,
      pageCount: review.list.pageCount,
      totalCount: review.list.totalCount,
      reviewLoading: loading['review/getReviews'],
      reviewSubmitLoading: loading['review/postReview'],
      itemLoading: loading['item/getItem'],
      isPaid: item.item.isPaid,
    }),
    shallowEqual,
  );
  const [isLiked, setIsLiked] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPostTitle('');
    setPostContent('');
    setFile(null);
    setStar(5);
    if (fileRef.current) fileRef.current.value = '';
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
        originalPrice={originalPrice}
        likeShow={!!userId}
        isLiked={isLiked}
        setIsLiked={toggleIsLiked}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
        setCount={setCount}
        salePercent={salePercent}
      />
      <Detail
        contents={contents}
        reviewCount={totalCount}
        reviews={reviews}
        itemLoading={itemLoading}
        reviewLoading={reviewLoading}
        pageCount={pageCount}
        pageId={pageId}
        setPageId={setPageId}
      />
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
        reviewSubmitLoading={reviewSubmitLoading}
        fileRef={fileRef}
        isPaid={isPaid}
      />
      <LoginModal visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default ItemDetailContainer;
