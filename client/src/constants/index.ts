import { ESortType } from 'types/item';

export const SMART_MENU_LARGE_WIDTH = 1200;
export const SMART_MENU_SMALL_WIDTH = 600;
export const SMART_MENU_BLOCK_DELAY = 100;

export const GITHUB_LOGIN_LINK = `http://${window.location.hostname}:3000/api/auth/github`;

export const SORT = [
  { type: ESortType.RECOMMEND, value: '추천순' },
  { type: ESortType.POPULAR, value: '인기순' },
  { type: ESortType.RECENT, value: '최신순' },
  { type: ESortType.CHEAP, value: '낮은가격순' },
  { type: ESortType.EXPENSIVE, value: '높은가격순' },
];
