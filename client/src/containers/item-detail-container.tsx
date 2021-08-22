import React, { FC } from 'react';

import ItemDetail from 'components/item-detail';

const dataFromServer = {
  thumbnail: 'https://storage.googleapis.com/bmart-5482b.appspot.com/008/302_main_018.png',
  title: '포스터. 메이배달이',
  price: 4000,
  contents: [
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/0ce61799bd0ed71aeccd8eb40afb38e5_174140.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/7702063f6d06989b57bc0b44b6f0a7d3_174146.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/db9b020d10a4a3d1367948513e57ad28_174152.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/37d51419b6707a3d8a2b84a866b02e80_174159.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/adea4720b3c8db7dd508e19b5b33a495_174207.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/e5d9380fabf06792f9d69b911d8a2afe_174217.jpg',
    'https://storage.googleapis.com/bmart-5482b.appspot.com/008/210617/779e5e6bfa29605e41990aa9d9763d3f_174233.jpg',
  ],
  isLike: false,
  isSoldOut: true,
  reviewCount: 2,
};

const MainItemContainer: FC = () => {
  const { thumbnail, title, price, contents, isLike, isSoldOut, reviewCount } = dataFromServer;

  return (
    <ItemDetail
      thumbnail={thumbnail}
      title={title}
      price={price}
      contents={contents}
      isLike={isLike}
      isSoldOut={isSoldOut}
      reviewCount={reviewCount}
    />
  );
};

export default MainItemContainer;
