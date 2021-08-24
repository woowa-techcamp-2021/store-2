import React, { FC } from 'react';

import ItemInfo from './item-info';
import Detail from './detail';

export interface ItemDetailProps {
  thumbnail: string;
  title: string;
  price: number;
  contents: string[];
  isLike: boolean;
  isSoldOut: boolean;
  reviewCount: number;
  onSubmitCart: () => void;
  onBuy: () => void;
}

const ItemDetail: FC<ItemDetailProps> = ({
  thumbnail,
  title,
  price,
  contents,
  isLike,
  isSoldOut,
  reviewCount,
  onSubmitCart,
  onBuy,
}) => {
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
      />
      <Detail contents={contents} reviewCount={reviewCount} />
    </>
  );
};

export default ItemDetail;
