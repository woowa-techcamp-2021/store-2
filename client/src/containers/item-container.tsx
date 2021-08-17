import React, { FC } from 'react';
import ItemList from 'components/item/item-list';
import { IItem } from 'types/item';

const ITEM_DUMMY: IItem[] = [
  {
    id: 1,
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MDJfMTk3/MDAxNTI1MjM1MDI1MjM2.qcbRcEwFPkpyaAV_RQ41cmQzmVEZHJSM3fiwzUeNoecg.a9D8oTOx7Jl0MKyCHvd1TnsbRllFwuYV0lvOZTlUwQsg.JPEG.smartbaedal/image_800505831525234558336.jpg?type=w800',
    title: '맥주짠 세트',
    price: 9810,
    isSale: true,
    salePercent: 10,
    originalPrice: 10900,
  },
  {
    id: 2,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20191211/1249258/1249258_1_500.png',
    title: 'ㅋㅋ슬리퍼 블랙',
    price: 21000,
    isBest: true,
  },
  {
    id: 3,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20210423/1917382/1917382_1_500.jpg',
    title: '커피찌꺼기를 재활용해 만든 연필',
    price: 2500,
    isGreen: true,
    isNew: true,
  },
  {
    id: 4,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20191211/1249258/1249258_1_500.png',
    title: '반반휴지. 물반휴지반',
    price: 1500,
    isBest: true,
  },
  {
    id: 5,
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MDJfMTk3/MDAxNTI1MjM1MDI1MjM2.qcbRcEwFPkpyaAV_RQ41cmQzmVEZHJSM3fiwzUeNoecg.a9D8oTOx7Jl0MKyCHvd1TnsbRllFwuYV0lvOZTlUwQsg.JPEG.smartbaedal/image_800505831525234558336.jpg?type=w800',
    title: '맥주짠 세트',
    price: 9810,
    isSale: true,
    salePercent: 10,
    originalPrice: 10900,
  },
  {
    id: 6,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20191211/1249258/1249258_1_500.png',
    title: 'ㅋㅋ슬리퍼 블랙',
    price: 21000,
  },
  {
    id: 7,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20210423/1917382/1917382_1_500.jpg',
    title: '커피찌꺼기를 재활용해 만든 연필',
    price: 2500,
  },
  {
    id: 8,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20210423/1917382/1917382_1_500.jpg',
    title: '반반휴지. 물반휴지반',
    price: 1500,
  },
  {
    id: 9,
    thumbnail:
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MDJfMTk3/MDAxNTI1MjM1MDI1MjM2.qcbRcEwFPkpyaAV_RQ41cmQzmVEZHJSM3fiwzUeNoecg.a9D8oTOx7Jl0MKyCHvd1TnsbRllFwuYV0lvOZTlUwQsg.JPEG.smartbaedal/image_800505831525234558336.jpg?type=w800',
    title: '맥주짠 세트',
    price: 10900,
  },
  {
    id: 10,
    thumbnail: 'https://image.msscdn.net/images/goods_img/20191211/1249258/1249258_1_500.png',
    title: 'ㅋㅋ슬리퍼 블랙',
    price: 21000,
  },
];

const ItemContainer: FC = () => {
  /* TODO: get items method - saga */
  return <ItemList items={ITEM_DUMMY} isLoading={false} />;
};

export default ItemContainer;
