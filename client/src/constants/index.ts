import { ESortType } from 'types/item';
import { ADDRESS_URL, ORDER_LIST_URL } from 'constants/urls';

export const MAX_TRY_COUNT = 10;
export const DELAY_TIME = 1000;

export const SMART_MENU_LARGE_WIDTH = 1200;
export const SMART_MENU_SMALL_WIDTH = 600;
export const SMART_MENU_MOBILE_WIDTH = 480;
export const SMART_MENU_BLOCK_DELAY = 100;

export const INNER_ERROR = '알 수 없는 에러가 발생했습니다.';

export const GITHUB_LOGIN_LINK = `http://${window.location.hostname}:3000/api/auth/github`;

export const SORT = [
  { type: ESortType.RECOMMEND, value: '추천순' },
  { type: ESortType.POPULAR, value: '인기순' },
  { type: ESortType.RECENT, value: '최신순' },
  { type: ESortType.CHEAP, value: '낮은가격순' },
  { type: ESortType.EXPENSIVE, value: '높은가격순' },
];

export const MY_PAGE_NAV = [
  { link: ORDER_LIST_URL, name: '주문목록 조회' },
  { link: ADDRESS_URL, name: '배송지 관리' },
];

export const TITLE = '배민문구사 - ';
