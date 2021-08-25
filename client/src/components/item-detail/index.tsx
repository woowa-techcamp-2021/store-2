import React, { FC } from 'react';

import InfoSection from './info-section';
import DetailInfo from './detail-info';

export interface ItemDetailProps {
  thumbnail: string;
  title: string;
  price: number;
  contents: string[];
  isLike: boolean;
  isSoldOut: boolean;
  reviewCount: number;
  onSubmitCart: (count: number) => void;
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
      <InfoSection
        thumbnail={thumbnail}
        title={title}
        price={price}
        isLike={isLike}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
      />
      <DetailInfo contents={contents} reviewCount={reviewCount} />
    </>
  );
};

export default ItemDetail;
